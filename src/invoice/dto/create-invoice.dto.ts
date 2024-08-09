import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
  IsString,
  IsDate,
  IsMongoId,
} from 'class-validator';

export class CreateInvoiceDto {
  @IsOptional()
  @IsMongoId()
  readonly supplierId?: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly issueDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly dueDate: Date;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsOptional()
  @IsNumber()
  readonly installments?: number;

  @IsOptional()
  @IsEnum(['open', 'paid', 'overdue'])
  readonly status?: 'open' | 'paid' | 'overdue';

  @IsOptional()
  @IsString()
  readonly notes?: string;
}
