import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { BookService } from '../services/book.service';
import { Lang } from 'src/decorators/lang.decorator';
import { FilterBookDTO } from '../dto/filter-book.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBooks(@Query() query: FilterBookDTO, @Lang() lang: string) {
    const { data, total, meta } = await this.bookService.getBooks(query, lang);
    return { data, total, meta };
  }
}
