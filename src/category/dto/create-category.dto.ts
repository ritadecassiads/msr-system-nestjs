import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Eletrônicos',
    description: 'Nome da categoria',
  })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Categoria para produtos eletrônicos, como celulares e laptops',
    description: 'Descrição detalhada da categoria (opcional)',
  })
  readonly description?: string;
}
