import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsEmail,
  IsOptional,
  Matches,
} from 'class-validator';
import { Match } from 'src/decorators/match.decorator';
import { Expose } from 'class-transformer';

export class RegistrationDto {
  @IsString()
  @Expose({ name: 'name' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Expose({ name: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[0-9])(?=.*[a-zA-Z]).*$/, {
    message: 'Password must contain alphabet,numbers and special characters',
  })
  @Expose({ name: 'password' })
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('password')
  @Expose({ name: 'confirmPassword' })
  confirm_password: string;

  @IsString()
  @IsOptional()
  salt: string;
}
