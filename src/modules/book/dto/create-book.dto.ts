import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'author' })
  author: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'title' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'isbn' })
  isbn: string;

  @IsNumber()
  @IsNotEmpty()
  @Expose({ name: 'quantity' })
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'shelfLocation' })
  shelf_location: string;
}
