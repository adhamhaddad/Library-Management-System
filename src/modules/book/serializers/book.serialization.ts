import { Expose } from 'class-transformer';

export class BookSerialization {
  @Expose({ name: 'uuid' })
  id: string;

  @Expose({ name: 'title' })
  title: string;

  @Expose({ name: 'author' })
  author: string;

  @Expose({ name: 'isbn' })
  isbn: string;

  @Expose({ name: 'quantity' })
  quantity: number;

  @Expose({ name: 'available_quantity' })
  availableQuantity: number;

  @Expose({ name: 'shelf_location' })
  shelfLocation: string;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;
}
