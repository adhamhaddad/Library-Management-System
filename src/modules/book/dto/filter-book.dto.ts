import { Type } from 'class-transformer';
import { IsOptional, IsNumber, Min, IsString } from 'class-validator';

export class FilterBookFilterDTO {
  @IsOptional()
  @IsString()
  keyword?: string;
}

export class FilterBookDTO {
  // paginate
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  paginate?: number;

  // page
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @Type(() => FilterBookFilterDTO)
  filter?: FilterBookFilterDTO;

  @IsOptional()
  sort?: string;
}
