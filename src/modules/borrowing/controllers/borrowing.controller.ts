import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BorrowingService } from '../services/borrowing.service';
import { CreateBorrowingDto } from '../dto/create-borrowing.dto';
import { Lang } from 'src/decorators/lang.decorator';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { FilterBorrowingDTO } from '../dto/filter-borrowing.dto';

@UseGuards(JwtAuthGuard)
@Controller('borrowings')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @Post(':id/checkout')
  async checkOutBook(
    @Param('id') uuid: string,
    @Body() body: CreateBorrowingDto,
    @User() user: any,
    @Lang() lang: string,
  ) {
    const { message, data } = await this.borrowingService.checkOutBook(
      uuid,
      body,
      user,
      lang,
    );
    return { message, data };
  }

  @Post(':id/return')
  async returnBook(
    @Param('id') uuid: string,
    @User() user: any,
    @Lang() lang: string,
  ) {
    const { message, data } = await this.borrowingService.returnBook(
      uuid,
      user,
      lang,
    );
    return { message, data };
  }

  @Get()
  async getMyCheckedOutsBooks(
    @Query() query: FilterBorrowingDTO,
    @User() user: any,
    @Lang() lang: string,
  ) {
    const { data, total, meta } =
      await this.borrowingService.getMyCheckedOutsBooks(query, user);
    return { data, total, meta };
  }
}
