import { Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateBorrowingDto {
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Start date must be in YYYY-MM-DD format',
  })
  @Expose({ name: 'dueDate' })
  due_date: Date;
}
