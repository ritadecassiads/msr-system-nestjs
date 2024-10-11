import { IsOptional, IsString, IsNumber, IsArray } from 'class-validator';

export class ResponseSaleDto {
  @IsOptional()
  @IsString()
  code?: number;

  @IsOptional()
  @IsString()
  @IsArray()
  products: string[];

  @IsOptional()
  @IsString()
  clientId?: string;

  @IsOptional()
  @IsString()
  openedByEmployee?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  totalPrice?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class ResponseMenssage {
  @IsString()
  message: string;
}
