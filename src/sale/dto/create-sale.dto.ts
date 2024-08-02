import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsOptional,
  IsMongoId,
  IsEnum,
  IsArray,
} from 'class-validator';

export class CreateSaleDto {
  @IsNotEmpty()
  @IsMongoId()
  @IsArray()
  products: string[];

  @IsNotEmpty()
  @IsMongoId()
  clientId: string;

  @IsNotEmpty()
  @IsMongoId()
  sellerId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  saleDate?: Date;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsEnum(['open', 'close'])
  status?: 'open' | 'close';
}
