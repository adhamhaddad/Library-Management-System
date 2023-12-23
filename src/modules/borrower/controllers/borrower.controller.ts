import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { BorrowerService } from '../services/borrower.service';
import { Lang } from 'src/decorators/lang.decorator';
import { User } from 'src/decorators/user.decorator';
import { UpdateBorrowerDto } from '../dto/update-borrower.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('borrowers')
export class BorrowerController {
  constructor(private readonly borrowerService: BorrowerService) {}

  @Patch(':id')
  async updateBorrower(
    @Body() body: UpdateBorrowerDto,
    @User() user: any,
    @Lang() lang: string,
  ) {
    const { message, data } = await this.borrowerService.updateBorrower(
      body,
      user,
      lang,
    );
    return { message, data };
  }
}
