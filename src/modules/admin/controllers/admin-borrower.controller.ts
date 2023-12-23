import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BorrowerService } from 'src/modules/borrower/services/borrower.service';
import { Lang } from 'src/decorators/lang.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/modules/admin/guards/admin.guard';
import { FilterBorrowerDTO } from '../../borrower/dto/filter-borrowers.dto';

@UseGuards(AuthGuard('jwt'), AdminGuard)
@Controller('admin/borrowers')
export class AdminBorrowerController {
  constructor(private readonly borrowerService: BorrowerService) {}

  @Get()
  async getBorrowers(@Query() query: FilterBorrowerDTO, @Lang() lang: string) {
    const { data, total, meta } = await this.borrowerService.getBorrowers(
      query,
      lang,
    );
    return { data, total, meta };
  }

  @Delete(':id')
  async deleteBorrower(@Param('id') uuid: string, @Lang() lang: string) {
    const { message, data } = await this.borrowerService.deleteBorrower(
      uuid,
      lang,
    );
    return { message, data };
  }
}
