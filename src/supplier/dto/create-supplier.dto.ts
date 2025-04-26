import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AddressDto } from '../../address/dto/address.dto';

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Fornecedor ABC',
    description: 'Nome do fornecedor',
  })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '12.345.678/0001-99',
    description: 'CNPJ do fornecedor',
  })
  readonly cnpj: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '11987654321',
    description: 'Número de telefone do fornecedor (opcional)',
  })
  readonly phone?: string;

  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'contato@fornecedorabc.com',
    description: 'Endereço de e-mail do fornecedor (opcional)',
  })
  readonly email?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'João Silva',
    description: 'Nome da pessoa de contato no fornecedor (opcional)',
  })
  readonly contactPerson?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Fornecedor confiável com entrega rápida',
    description: 'Notas adicionais sobre o fornecedor (opcional)',
  })
  readonly notes?: string;

  @ValidateNested()
  @Type(() => AddressDto)
  @ApiPropertyOptional({
    type: AddressDto,
    description: 'Endereço do fornecedor (opcional)',
  })
  address?: AddressDto;
}
