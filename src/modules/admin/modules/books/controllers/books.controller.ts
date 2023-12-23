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
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Lang } from 'src/decorators/lang.decorator';
import { FilterBookDTO } from '../dto/filter-book.dto';

@UseGuards(AuthGuard('jwt'), AdminGuard)
@Controller('admin/books')
export class BooksController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(@Body() body: CreateBookDto, @Lang() lang: string) {
    const { message, data } = await this.bookService.createBook(body, lang);
    return { message, data };
  }

  @Get()
  async getBooks(@Query() query: FilterBookDTO, @Lang() lang: string) {
    const { data, total, meta } = await this.bookService.getBooks(query, lang);
    return { data, total, meta };
  }

  @Patch(':id')
  async updateBook(
    @Param('id') uuid: string,
    @Body() body: UpdateBookDto,
    @Lang() lang: string,
  ) {
    const { message, data } = await this.bookService.updateBook(
      uuid,
      body,
      lang,
    );
    return { message, data };
  }

  @Delete(':id')
  async deleteBook(@Param('id') uuid: string, @Lang() lang: string) {
    const { message, data } = await this.bookService.deleteBook(uuid, lang);
    return { message, data };
  }
}
