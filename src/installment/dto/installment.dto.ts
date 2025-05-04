import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsEnum, IsDate, IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InstallmentDto {
  @IsMongoId()
  @IsOptional()
  @ApiProperty({ example: '644a1f4e5f1b2c3d4e5f6a7b', description: 'ID da parcela da venda' })
  readonly _id: string;

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
