import { IsString, IsNumber, IsMongoId } from 'class-validator';

export class SaleProductDto {
  @IsString()
  @IsMongoId()
  _id: string;

  @IsNumber()
  code: number;

  @IsString()
  name: string;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  totalPrice: number;

  @IsNumber()
  quantity: number;
}
