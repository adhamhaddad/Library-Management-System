import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrowing } from '../entities/borrowing.entity';
import {
  Brackets,
  OrderByCondition,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { User } from 'src/modules/auth/entities/user.entity';
import { CreateBorrowingDto } from '../dto/create-borrowing.dto';
import { I18nService } from 'nestjs-i18n';
import { ErrorMessages } from 'src/interfaces/error-messages.interface';
import { IBorrowing } from '../interfaces/borrowing.interface';
import { FilterBorrowerDTO } from 'src/modules/borrower/dto/filter-borrowers.dto';
import { plainToClass } from 'class-transformer';
import { BorrowingSerialization } from '../serializers/borrowing.serialization';
import { Book } from 'src/modules/book/entities/book.entity';
import { GetCheckedOutSerialization } from '../serializers/get-checked-outs.serialization';

@Injectable()
export class BorrowingService {
  constructor(
    @InjectRepository(Borrowing)
    private readonly borrowingRepository: Repository<Borrowing>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    private readonly i18nService: I18nService,
  ) {}

  async checkOutBook(
    bookUuid: string,
    body: CreateBorrowingDto,
    user: User,
    lang: string,
  ) {
    const errorMessage: ErrorMessages = this.i18nService.translate(
      'error-messages',
      {
        lang,
      },
    );

    const book = await this.bookRepository.findOne({
      where: { uuid: bookUuid },
    });
    if (!book)
      throw new HttpException(errorMessage.bookNotFound, HttpStatus.NOT_FOUND);

    if (book.available_quantity === 0)
      throw new HttpException('No enough quantity', HttpStatus.BAD_REQUEST);

    // Check if it still checked out.
    const isCheckedOut = await this.borrowingRepository.findOne({
      where: {
        return_date: null,
        user: { id: user.id },
        book: { id: book.id },
      },
      relations: ['user', 'book'],
    });
    if (isCheckedOut)
      throw new HttpException('You are still have this book', HttpStatus.FOUND);

    // Change Quantity
    book.available_quantity -= 1;
    await this.bookRepository.save(book);

    const borrowingCreated = this.borrowingRepository.create({
      check_out_date: new Date(),
      due_date: new Date(body.due_date),
      user,
      book,
    });
    const borrowing = await this.borrowingRepository.save(borrowingCreated);

    return {
      message: 'book checked out successfully',
      data: this.serializeGetCheckedOut(borrowing),
    };
  }

  async returnBook(uuid: string, user: User, lang: string) {
    const errorMessage: ErrorMessages = this.i18nService.translate(
      'error-messages',
      {
        lang,
      },
    );

    const borrowing = await this.borrowingRepository.findOne({
      where: { uuid, user: { id: user.id } },
      relations: ['user', 'book'],
    });
    if (!borrowing)
      throw new HttpException('Borrowing not found', HttpStatus.NOT_FOUND);

    if (borrowing.return_date !== null)
      throw new HttpException(
        'The book has been return before',
        HttpStatus.NOT_FOUND,
      );

    const book = await this.bookRepository.findOne({
      where: { uuid: borrowing.book.uuid },
    });
    if (!book) throw new HttpException('Book not found', HttpStatus.NOT_FOUND);

    borrowing.return_date = new Date();
    const borrowingUpdated = await this.borrowingRepository.save(borrowing);
    if (!borrowingUpdated)
      throw new HttpException('Failed to return book', HttpStatus.BAD_REQUEST);

    // Change Quantity
    book.available_quantity += 1;
    await this.bookRepository.save(book);

    return {
      message: 'book return successfully',
      data: this.serializeGetCheckedOut(borrowingUpdated),
    };
  }

  async getMyCheckedOutsBooks(user: User, lang: string) {
    const borrowings = await this.borrowingRepository.find({
      where: { return_date: null },
      relations: ['user', 'book'],
    });

    return {
      data: borrowings.map((borrowing) =>
        this.serializeGetCheckedOut(borrowing),
      ),
    };
  }

  // Admin
  async getBorrowings(query: FilterBorrowerDTO, lang: string) {
    const errorMessage: ErrorMessages = this.i18nService.translate(
      'error-messages',
      {
        lang,
      },
    );

    const selector: Partial<IBorrowing> = {};
    let order: OrderByCondition = {
      created_at: 'DESC',
    };
    query.paginate = query.paginate ? query.paginate : 15;
    query.page = query.page ? query.page : 1;
    const skip = (query.page - 1) * query.paginate;

    const qb = this.borrowingRepository
      .createQueryBuilder('borrowing')
      .where(selector);

    qb.orderBy(order).skip(skip).take(query.paginate);

    const [borrowings, total] = await qb.getManyAndCount();

    const data = borrowings.map((borrowing) =>
      this.serializeBorrowing(borrowing),
    );

    return {
      data,
      total,
      meta: {
        total,
        currentPage: query.page,
        eachPage: query.paginate,
        lastPage: Math.ceil(borrowings?.length / query.paginate),
      },
    };
  }

  serializeBorrowing(book) {
    return plainToClass(BorrowingSerialization, book, {
      excludeExtraneousValues: true,
      enableCircularCheck: true,
      strategy: 'excludeAll',
    });
  }

  serializeGetCheckedOut(borrowing) {
    return plainToClass(GetCheckedOutSerialization, borrowing, {
      excludeExtraneousValues: true,
      enableCircularCheck: true,
      strategy: 'excludeAll',
    });
  }
}
