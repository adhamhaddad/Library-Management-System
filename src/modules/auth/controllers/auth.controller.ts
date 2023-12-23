import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { RegistrationDto } from '../dto/registeration.dto';
import { Lang } from 'src/decorators/lang.decorator';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { PasswordResetCompleteDto } from '../dto/password-reset-complete.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegistrationDto, @Lang() lang: string) {
    const { message, data } = await this.authService.register(body, lang);
    return { message, data };
  }

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: Response,
    @Lang() lang: string,
  ) {
    const { message, token, data } = await this.authService.login(body, lang);

    response.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 50 * 60 * 1000),
    });

    return { message, data };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() request: Request | any,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { status } = await this.authService.logout(request);
    if (status) {
      response.clearCookie('access_token', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      });
      return { message: 'Logout Successfully' };
    }
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Post('password-reset')
  async passwordResetComplete(
    @Body() body: PasswordResetCompleteDto,
    @Lang() lang: string,
  ) {
    const { message, data } = await this.authService.updateUserPassword(
      body,
      lang,
    );
    return { message, data };
  }
}
