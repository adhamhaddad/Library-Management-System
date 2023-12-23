import { Expose, Type } from 'class-transformer';
import { BookSerialization } from 'src/modules/book/serializers/book.serialization';

export class GetCheckedOutSerialization {
  @Expose({ name: 'uuid' })
  id: string;

  @Type(() => BookSerialization)
  @Expose({ name: 'book' })
  book: BookSerialization;

  @Expose({ name: 'check_out_date' })
  checkOutDate: Date;

  @Expose({ name: 'due_date' })
  dueDate: Date;

  @Expose({ name: 'return_date' })
  returnDate: Date;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;
}
