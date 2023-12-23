import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Brackets,
  OrderByCondition,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { User } from 'src/modules/auth/entities/user.entity';
import { IUser } from 'src/modules/auth/interfaces/user.interface';
import { I18nService } from 'nestjs-i18n';
import { ErrorMessages } from 'src/interfaces/error-messages.interface';
import { UpdateBorrowerDto } from '../dto/update-borrower.dto';
import { FilterBorrowerDTO } from 'src/modules/borrower/dto/filter-borrowers.dto';
import { plainToClass } from 'class-transformer';
import { UserSerialization } from 'src/modules/auth/serializers/user.serialization';

@Injectable()
export class BorrowerService {
  constructor(
    @InjectRepository(User)
    private readonly borrowerRepository: Repository<User>,
    private readonly i18nService: I18nService,
  ) {}

  async getBorrowers(query: FilterBorrowerDTO, lang: string) {
    const errorMessage: ErrorMessages = this.i18nService.translate(
      'error-messages',
      {
        lang,
      },
    );

    const selector: Partial<IUser> = {};
    const keyword = query.filter?.keyword;
    let order: OrderByCondition = {
      created_at: 'DESC',
    };
    query.paginate = query.paginate ? query.paginate : 15;
    query.page = query.page ? query.page : 1;
    const skip = (query.page - 1) * query.paginate;

    // Sort
    if (query.sort) {
      const orderDirection = query.sort.startsWith('-') ? 'DESC' : 'ASC';
      const orderKey = query.sort.replace(/^-/, '');
      const borrowerFieldsMap = {
        name: 'name',
        email: 'email',
      };

      if (borrowerFieldsMap[orderKey])
        order = {
          [borrowerFieldsMap[orderKey]]: orderDirection,
        };
    }

    function addKeywordSearch(qb: SelectQueryBuilder<User>, keyword: string) {
      qb.andWhere(
        new Brackets((subQb) => {
          subQb.where('user.name LIKE :keyword OR user.email LIKE :keyword', {
            keyword: `%${keyword}%`,
          });
        }),
      );
    }

    const qb = this.borrowerRepository
      .createQueryBuilder('user')
      .where(selector);

    if (keyword) {
      addKeywordSearch(qb, keyword);
    }
    qb.orderBy(order).skip(skip).take(query.paginate);

    const [users, total] = await qb.getManyAndCount();

    const data = users.map((user) => this.serializeUser(user));

    return {
      data,
      total,
      meta: {
        total,
        currentPage: query.page,
        eachPage: query.paginate,
        lastPage: Math.ceil(users?.length / query.paginate),
      },
    };
  }

  async updateBorrower(body: UpdateBorrowerDto, user: User, lang: string) {
    const errorMessage: ErrorMessages = this.i18nService.translate(
      'error-messages',
      {
        lang,
      },
    );

    const borrower = await this.borrowerRepository.findOne({
      where: { id: user.id },
    });
    if (!borrower)
      throw new HttpException(errorMessage.userNotFound, HttpStatus.NOT_FOUND);

    const { affected } = await this.borrowerRepository.update(
      { uuid: borrower.uuid },
      body,
    );
    if (!affected)
      throw new HttpException(
        'Failed to update borrower',
        HttpStatus.BAD_REQUEST,
      );

    const updatedBorrower = await this.borrowerRepository.find({
      where: { id: user.id },
    });

    return { message: 'Borrower updated successfully', data: updatedBorrower };
  }

  async deleteBorrower(uuid: string, lang: string) {
    const errorMessage: ErrorMessages = this.i18nService.translate(
      'error-messages',
      {
        lang,
      },
    );

    const borrower = await this.borrowerRepository.findOne({
      where: { uuid },
    });
    if (!borrower)
      throw new HttpException(errorMessage.userNotFound, HttpStatus.NOT_FOUND);

    const { affected } = await this.borrowerRepository.delete({ uuid });
    if (!affected)
      throw new HttpException(
        'Failed to delete borrower',
        HttpStatus.BAD_REQUEST,
      );

    return {
      message: 'Borrower deleted successfully',
      data: this.serializeUser(borrower),
    };
  }

  serializeUser(user) {
    return plainToClass(UserSerialization, user, {
      excludeExtraneousValues: true,
      enableCircularCheck: true,
      strategy: 'excludeAll',
    });
  }
}
