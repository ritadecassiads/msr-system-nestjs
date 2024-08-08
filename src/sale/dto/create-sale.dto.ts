import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsOptional,
  IsEnum,
  IsArray,
  IsMongoId,
} from 'class-validator';

export class CreateSaleDto {
  @IsNotEmpty()
  @IsArray()
  @IsMongoId({ each: true })
  products: string[];

  @IsOptional()
  @IsMongoId()
  clientId?: string;

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
