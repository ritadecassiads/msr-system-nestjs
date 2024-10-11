import {
  IsNotEmpty,
  IsNumber,
  IsString,
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

  //@IsMongoId()
  @IsOptional()
  clientId?: string;

  @IsNotEmpty({ message: 'openedByEmployee is required' })
  @IsMongoId()
  openedByEmployee: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsEnum(['open', 'close'])
  status?: 'open' | 'close';

  @IsOptional()
  @IsEnum(['credit', 'debit', 'cash', 'pix', 'bankTransfer'])
  paymentMethod?: string;
}
