import { Type } from 'class-transformer';
import { IsOptional, IsNumber, Min, IsString } from 'class-validator';

export class FilterBorrowerFilterDTO {
  @IsOptional()
  @IsString()
  keyword?: string;
}

export class FilterBorrowerDTO {
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
  @Type(() => FilterBorrowerFilterDTO)
  filter?: FilterBorrowerFilterDTO;

  @IsOptional()
  sort?: string;
}
