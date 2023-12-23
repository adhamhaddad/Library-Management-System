import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Brackets,
  OrderByCondition,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { Book } from '../entities/book.entity';
import { I18nService } from 'nestjs-i18n';
import { CreateBookDto } from '../dto/create-book.dto';
import { ErrorMessages } from 'src/interfaces/error-messages.interface';
import { plainToClass } from 'class-transformer';
import { BookSerialization } from '../serializers/book.serialization';
import { UpdateBookDto } from '../dto/update-book.dto';
import { FilterBookDTO } from '../dto/filter-book.dto';
import { IBook } from '../interfaces/book.interface';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly i18nService: I18nService,
  ) {}

  async createBook(body: CreateBookDto, lang: string) {
    const errorMessage: ErrorMessages = this.i18nService.translate(
      'error-messages',
      {
        lang,
      },
    );

    const bookCreated = this.bookRepository.create({
      ...body,
      available_quantity: body.quantity,
    });
    const book = await this.bookRepository.save(bookCreated);
    if (!book)
      throw new HttpException(
        errorMessage.failedToCreateBook,
        HttpStatus.BAD_REQUEST,
      );

    return {
      message: errorMessage.bookCreatedSuccessfully,
      data: this.serializeBook(book),
    };
  }

  async getBooks(query: FilterBookDTO, lang: string) {
    const selector: Partial<IBook> = {};
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
      const bookFieldsMap = {
        title: 'title',
        author: 'author',
        isbn: 'isbn',
      };

      if (bookFieldsMap[orderKey])
        order = {
          [bookFieldsMap[orderKey]]: orderDirection,
        };
    }

    function addKeywordSearch(qb: SelectQueryBuilder<Book>, keyword: string) {
      qb.andWhere(
        new Brackets((subQb) => {
          subQb.where(
            'book.title LIKE :keyword OR book.author LIKE :keyword OR book.isbn LIKE :keyword',
            { keyword: `%${keyword}%` },
          );
        }),
      );
    }

    const qb = this.bookRepository.createQueryBuilder('book').where(selector);

    if (keyword) {
      addKeywordSearch(qb, keyword);
    }
    qb.orderBy(order).skip(skip).take(query.paginate);

    const [books, total] = await qb.getManyAndCount();

    const data = books.map((book) => this.serializeBook(book));

    return {
      data,
      total,
      meta: {
        total,
        currentPage: query.page,
        eachPage: query.paginate,
        lastPage: Math.ceil(books?.length / query.paginate),
      },
    };
  }

  async updateBook(uuid: string, body: UpdateBookDto, lang: string) {
    const errorMessage: ErrorMessages = this.i18nService.translate(
      'error-messages',
      {
        lang,
      },
    );

    const book = await this.bookRepository.findOne({ where: { uuid } });
    if (!book)
      throw new HttpException(errorMessage.bookNotFound, HttpStatus.NOT_FOUND);

    const { affected } = await this.bookRepository.update({ uuid }, body);
    if (!affected)
      throw new HttpException(
        errorMessage.failedToUpdateBook,
        HttpStatus.BAD_REQUEST,
      );

    const updatedBook = await this.bookRepository.find({ where: { uuid } });

    return {
      message: errorMessage.bookUpdatedSuccessfully,
      data: this.serializeBook(updatedBook),
    };
  }

  async deleteBook(uuid: string, lang: string) {
    const errorMessage: ErrorMessages = this.i18nService.translate(
      'error-messages',
      {
        lang,
      },
    );

    const book = await this.bookRepository.findOne({ where: { uuid } });
    if (!book)
      throw new HttpException(errorMessage.bookNotFound, HttpStatus.NOT_FOUND);

    const { affected } = await this.bookRepository.delete({ uuid });
    if (!affected)
      throw new HttpException(
        errorMessage.failedToDeleteBook,
        HttpStatus.BAD_REQUEST,
      );

    return {
      message: errorMessage.bookDeletedSuccessfully,
      data: this.serializeBook(book),
    };
  }

  serializeBook(book) {
    return plainToClass(BookSerialization, book, {
      excludeExtraneousValues: true,
      enableCircularCheck: true,
      strategy: 'excludeAll',
    });
  }
}
