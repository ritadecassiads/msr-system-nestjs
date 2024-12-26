import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
  IsString,
  IsDate,
  IsMongoId,
  ValidateNested,
} from 'class-validator';
import { InstallmentDto } from './installment.dto';

export class CreateInvoiceDto {
  @IsOptional()
  @IsMongoId()
  readonly supplierId?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  readonly issueDate: Date;

  @IsDate()
  @Type(() => Date)
  readonly dueDate: Date;

  @IsNotEmpty()
  @IsNumber()
  readonly totalAmount: number;

  @ValidateNested()
  @IsOptional()
  @Type(() => InstallmentDto)
  readonly installments?: InstallmentDto[];

  @IsOptional()
  @IsEnum(['unpaid', 'paid', 'overdue'])
  readonly status?: 'unpaid' | 'paid' | 'overdue';

  @IsOptional()
  @IsString()
  readonly notes?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;
}
