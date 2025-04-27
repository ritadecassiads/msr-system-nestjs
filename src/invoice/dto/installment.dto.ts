import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InstallmentDto {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({
    example: '2025-05-01',
    description: 'Data de vencimento da parcela',
  })
  readonly dueDate: Date;

  @IsNumber()
  @ApiProperty({
    example: 150.75,
    description: 'Valor da parcela',
  })
  readonly amount: number;

  @IsOptional()
  @IsEnum(['unpaid', 'paid', 'overdue'])
  @ApiPropertyOptional({
    example: 'unpaid',
    description: 'Status da parcela',
    enum: ['unpaid', 'paid', 'overdue'],
  })
  readonly status?: 'unpaid' | 'paid' | 'overdue';
}
