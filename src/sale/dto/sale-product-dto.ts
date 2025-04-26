import { IsString, IsNumber, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaleProductDto {
  @IsString()
  @IsMongoId()
  @ApiProperty({
    example: '644a1f4e5f1b2c3d4e5f6a7b',
    description: 'ID do produto',
  })
  _id: string;

  @IsNumber()
  @ApiProperty({
    example: 12345,
    description: 'Código único do produto',
  })
  code: number;

  @IsString()
  @ApiProperty({
    example: 'Produto Exemplo',
    description: 'Nome do produto',
  })
  name: string;

  @IsNumber()
  @ApiProperty({
    example: 50.25,
    description: 'Preço unitário do produto',
  })
  unitPrice: number;

  @IsNumber()
  @ApiProperty({
    example: 100.50,
    description: 'Preço total do produto (quantidade x preço unitário)',
  })
  totalPrice: number;

  @IsNumber()
  @ApiProperty({
    example: 2,
    description: 'Quantidade do produto na venda',
  })
  quantity: number;
}
