import {
  HttpException,
  HttpStatus,
  Injectable,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { ErrorMessages } from 'src/interfaces/error-messages.interface';
import { Utils } from 'src/utils/utils';
import { PasswordHash } from 'src/utils/password-hash';
import * as bcrypt from 'bcrypt';
import { UserSerialization } from '../serializers/user.serialization';
import { plainToClass } from 'class-transformer';
import { LoginDto } from '../dto/login.dto';
import { PasswordResetCompleteDto } from '../dto/password-reset-complete.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RegistrationDto } from '../dto/registeration.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordHash: PasswordHash,
    private readonly jwtService: JwtService,
    private readonly utils: Utils,
    private readonly i18nService: I18nService,
  ) {}

  async register(body: RegistrationDto, lang: string) {
    const errorMessage: ErrorMessages = this.i18nService.translate(
      'error-messages',
      {
        lang,
      },
    );

    const { email } = body;

    // check if username or email exist
    const emailExist = await this.userRepository.count({ where: { email } });

    if (emailExist)
      throw new HttpException(errorMessage.emailTaken, HttpStatus.CONFLICT);

    const salt = this.passwordHash.generateRandomSalt();
    const hashedPassword = await bcrypt.hash(body.password + salt, 10);
    body.salt = salt;
    body.password = hashedPassword;

    //save user data
    const userSaveInitiate = this.userRepository.create(body);
    const user = await this.userRepository.save(userSaveInitiate);

    return {
      data: this.serializeUser(user),
      message: errorMessage.requestSuccessful,
    };
  }

  async login(body: LoginDto, lang: string) {
    const errorMessage: ErrorMessages = this.i18nService.translate(
      'error-messages',
      {
        lang,
      },
    );

    const { username, password } = body;

    const user = await this.getUser(username, lang);
    if (!user)
      throw new HttpException(
        errorMessage.userNotFound,
        HttpStatus.BAD_REQUEST,
      );

    // check for admin type
    const { salt } = user;

    const isPasswordMatch = await bcrypt.compare(
      password + salt,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new HttpException(
        errorMessage.invalidUsernameOrPassword,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.utils.redisSetValueDuration(
      `${user.email}-loginOtpPasswordVerified`,
      '1',
      120,
    );

    const token = await this.jwtService.signAsync({ user });

    return {
      message: errorMessage.loginSuccessfully,
      token,
      data: this.serializeUser(user),
    };
  }

  async updateUserPassword(body: PasswordResetCompleteDto, lang: string) {
    const { username, confirm_password, password } = body;

    const errorMessage: ErrorMessages = this.i18nService.translate(
      'error-messages',
      {
        lang,
      },
    );
    const user = await this.getUser(username, lang);
    const { email } = user;

    if (password !== confirm_password)
      throw new HttpException(
        errorMessage.passwordMismatch,
        HttpStatus.BAD_REQUEST,
      );

    const salt = this.passwordHash.generateRandomSalt();
    const hashedPassword = await bcrypt.hash(password + salt, 10);

    const { affected } = await this.userRepository.update(
      { id: user.id },
      { password: hashedPassword, salt },
    );

    const message =
      affected === 1
        ? errorMessage.requestSuccessful
        : errorMessage.requestFailed;

    return { message, data: this.serializeUser(user) };
  }

  async getUser(username: string, lang: string) {
    const errorMessage: ErrorMessages = this.i18nService.translate(
      'error-messages',
      {
        lang,
      },
    );

    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :username', {
        username,
      })
      .addSelect('user.password')
      .getOne();
    if (!user)
      throw new HttpException(errorMessage.userNotFound, HttpStatus.NOT_FOUND);

    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  async logout(@Req() request: Request) {
    const { access_token } = request.cookies;

    if (access_token) {
      //get all blacklisted tokens
      const blacklistedTokens =
        await this.utils.redisGetValue('blacklistedTokens');

      //parse blacklisted tokens
      const parsedBlackListedTokens = blacklistedTokens
        ? JSON.parse(blacklistedTokens)
        : [];

      //stringify blacklisted tokens
      const token = JSON.stringify([
        ...parsedBlackListedTokens,
        { token: access_token },
      ]);

      //setting blacklisted to redis
      await this.utils.redisSetValue('blacklistedTokens', token);

      return { status: true, token: access_token };
    }

    return { status: true, token: null };
  }

  serializeUser(user) {
    return plainToClass(UserSerialization, user, {
      excludeExtraneousValues: true,
      enableCircularCheck: true,
      strategy: 'excludeAll',
    });
  }
}
