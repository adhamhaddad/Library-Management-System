import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateBorrowerDto {
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'name' })
  name: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Expose({ name: 'email' })
  email: string;
}
