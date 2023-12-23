import { Type } from 'class-transformer';
import { IsOptional, IsNumber, Min, IsString } from 'class-validator';

export class FilterBorrowingFilterDTO {
  @IsOptional()
  @IsString()
  keyword?: string;
}

export class FilterBorrowingDTO {
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
  @Type(() => FilterBorrowingFilterDTO)
  filter?: FilterBorrowingFilterDTO;

  @IsOptional()
  sort?: string;
}
