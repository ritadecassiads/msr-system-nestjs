import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
  IsMongoId,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SaleProductDto } from './sale-product-dto';
import { Installment } from 'src/invoice/schemas/installment.schema';

export class CreateSaleDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleProductDto)
  @ApiProperty({
    type: [SaleProductDto],
    description: 'Lista de produtos incluídos na venda',
  })
  products: SaleProductDto[];

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({
    example: '644a1f4e5f1b2c3d4e5f6a7b',
    description: 'ID do cliente associado à venda (opcional)',
  })
  clientId?: string;

  @IsNotEmpty({ message: 'openedByEmployee is required' })
  @IsMongoId()
  @ApiProperty({
    example: '644a1f4e5f1b2c3d4e5f6a7b',
    description: 'ID do funcionário que abriu a venda',
  })
  openedByEmployee: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 150.75,
    description: 'Valor total da venda',
  })
  total: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Venda realizada com desconto especial',
    description: 'Notas adicionais sobre a venda (opcional)',
  })
  notes?: string;

  @IsOptional()
  @IsEnum(['open', 'closed'])
  @ApiPropertyOptional({
    example: 'open',
    description: 'Status da venda (aberta ou fechada)',
    enum: ['open', 'closed'],
  })
  status?: 'open' | 'closed';

  @IsOptional()
  @IsEnum(['credit', 'debit', 'cash', 'pix', 'bankTransfer', 'client-account'])
  @ApiPropertyOptional({
    example: 'credit',
    description: 'Método de pagamento utilizado na venda',
    enum: ['credit', 'debit', 'cash', 'pix', 'bankTransfer', 'client-account'],
  })
  paymentMethod?: string;

  @IsOptional()
  @ApiPropertyOptional({
    example: [],
    description: 'Parcelas associadas à venda (opcional)',
    type: [Installment],
  })
  installments: Installment[];

}
