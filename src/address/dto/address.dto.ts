import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Rua das Flores', description: 'Nome da rua do endereço' })
  readonly street: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123', description: 'Número do endereço' })
  readonly number: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Apto 101', description: 'Complemento do endereço (opcional)' })
  complement?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'São Paulo', description: 'Cidade do endereço' })
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'SP', description: 'Estado do endereço' })
  readonly state: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '12345-678', description: 'CEP do endereço' })
  readonly postalCode: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Brasil', description: 'País do endereço (opcional)' })
  readonly country?: string;
}
