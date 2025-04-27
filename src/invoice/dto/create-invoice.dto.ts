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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InstallmentDto } from './installment.dto';

export class CreateInvoiceDto {
  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({
    example: '644a1f4e5f1b2c3d4e5f6a7b',
    description: 'ID do fornecedor associado à fatura (opcional)',
  })
  readonly supplierId?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiPropertyOptional({
    example: '2025-04-01',
    description: 'Data de emissão da fatura (opcional)',
  })
  readonly issueDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({
    example: '2025-05-01',
    description: 'Data de vencimento da fatura',
  })
  readonly dueDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1500.75,
    description: 'Valor total da fatura',
  })
  readonly totalAmount: number;

  @ValidateNested()
  @IsOptional()
  @Type(() => InstallmentDto)
  @ApiPropertyOptional({
    type: [InstallmentDto],
    description: 'Lista de parcelas associadas à fatura (opcional)',
  })
  readonly installments?: InstallmentDto[];

  @IsOptional()
  @IsEnum(['unpaid', 'paid', 'overdue'])
  @ApiPropertyOptional({
    example: 'unpaid',
    description: 'Status da fatura (opcional)',
    enum: ['unpaid', 'paid', 'overdue'],
  })
  readonly status?: 'unpaid' | 'paid' | 'overdue';

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Fatura referente à compra de materiais de escritório',
    description: 'Notas adicionais sobre a fatura (opcional)',
  })
  readonly notes?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Compra de materiais de escritório',
    description: 'Descrição da fatura (opcional)',
  })
  readonly description?: string;
}
