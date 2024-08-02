import {
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
  IsArray,
} from 'class-validator';

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
  sellerId?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  totalPrice?: number;

  @IsOptional()
  @IsDate()
  saleDate?: Date;

  @IsOptional()
  @IsString()
  observations?: string;
}

export class ResponseMenssage {
  @IsString()
  message: string;
}
