import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsMongoId,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Nome deve ser preenchido.' })
  @IsString()
  @ApiProperty({
    example: 'Caneta Azul',
    description: 'Nome do produto',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Caneta esferográfica azul com tinta de alta qualidade',
    description: 'Descrição detalhada do produto (opcional)',
  })
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 2.5,
    description: 'Preço unitário do produto',
  })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 100,
    description: 'Quantidade em estoque do produto',
  })
  stock: number;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({
    example: '644a1f4e5f1b2c3d4e5f6a7b',
    description: 'ID do fornecedor associado ao produto (opcional)',
  })
  supplierId?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  @ApiPropertyOptional({
    example: ['644a1f4e5f1b2c3d4e5f6a7b', '644a1f4e5f1b2c3d4e5f6a7c'],
    description: 'Lista de IDs das categorias associadas ao produto (opcional)',
    type: [String],
  })
  categories?: string[];
}
