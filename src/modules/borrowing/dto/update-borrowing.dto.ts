import { Expose } from 'class-transformer';

export class UpdateBorrowingDto {
  @Expose({ name: 'returnDate' })
  return_date: Date;
}
