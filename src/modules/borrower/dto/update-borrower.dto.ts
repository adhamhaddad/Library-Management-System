import { Expose } from 'class-transformer';

export class UpdateBorrowerDto {
  @Expose({ name: 'name' })
  name: string;

  @Expose({ name: 'email' })
  email: string;
}
