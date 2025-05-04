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
  @IsEnum(['pending', 'paid', 'overdue'])
  @ApiPropertyOptional({
    example: 'pending',
    description: 'Status da parcela',
    enum: ['pending', 'paid', 'overdue'],
  })
  readonly status?: 'pending' | 'paid' | 'overdue';

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({
    example: '2025-05-01',
    description: 'Data que a parcela foi paga',
    required: false,
  })
  readonly paymentDate?: Date;

  @IsOptional()
  @IsEnum(['credit', 'debit', 'cash', 'pix', 'bankTransfer'])
  @ApiPropertyOptional({
    example: 'credit',
    description: 'Método de pagamento utilizado na venda',
    enum: ['credit', 'debit', 'cash', 'pix', 'bankTransfer'],
  })
  readonly paymentMethod?: string;
}
