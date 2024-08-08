import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateInvoiceDto {
  @IsNotEmpty()
  @IsString()
  supplier: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsDate()
  @IsNotEmpty()
  dueDate: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}
