import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/modules/admin/guards/admin.guard';
import { BorrowingService } from 'src/modules/borrowing/services/borrowing.service';
import { Lang } from 'src/decorators/lang.decorator';
import { FilterBookDTO } from 'src/modules/book/dto/filter-book.dto';

@UseGuards(AuthGuard('jwt'), AdminGuard)
@Controller('admin/borrowings')
export class AdminBorrowingsController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @Get()
  async getBorrowings(@Query() query: FilterBookDTO) {
    const { data, total, meta } =
      await this.borrowingService.getBorrowings(query);
    return { data, total, meta };
  }

  @Get('/over-due')
  async getBorrowingsOverDue(@Query() query: FilterBookDTO) {
    const { data, total, meta } = await this.borrowingService.getBorrowings(
      query,
      true,
    );
    return { data, total, meta };
  }
}
