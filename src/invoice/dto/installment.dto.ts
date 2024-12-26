import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsEnum, IsDate } from 'class-validator';

export class InstallmentDto {
  @IsDate()
  @Type(() => Date)
  readonly dueDate: Date;

  @IsNumber()
  readonly amount: number;

  @IsOptional()
  @IsEnum(['unpaid', 'paid', 'overdue'])
  readonly status?: 'unpaid' | 'paid' | 'overdue';
}
