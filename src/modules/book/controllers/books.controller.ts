import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/modules/admin/guards/admin.guard';
import { BookService } from '../services/book.service';
import { Lang } from 'src/decorators/lang.decorator';
import { FilterBookDTO } from '../dto/filter-book.dto';

@UseGuards(AuthGuard('jwt'), AdminGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBooks(@Query() query: FilterBookDTO, @Lang() lang: string) {
    const { data, total, meta } = await this.bookService.getBooks(query, lang);
    return { data, total, meta };
  }
}
