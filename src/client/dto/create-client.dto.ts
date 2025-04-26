import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
  IsMongoId,
  ValidateNested,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AddressDto } from '../../address/dto/address.dto';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John Doe', description: 'Nome completo do cliente' })
  name: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ example: '1990-01-01', description: 'Data de nascimento do cliente' })
  birthDate: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123.456.789-00', description: 'CPF do cliente' })
  cpf: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '12.345.678-9', description: 'RG do cliente' })
  rg: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(11, { message: 'O Telefone não pode ter mais que 11 caracteres.' })
  @ApiProperty({ example: '11987654321', description: 'Número de telefone do cliente (máximo 11 caracteres)' })
  phone: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'johndoe@example.com', description: 'Endereço de e-mail do cliente (opcional)' })
  email?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 10000, description: 'Limite de compras do cliente (opcional)' })
  purchaseLimit?: number = 10000;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Cliente VIP', description: 'Notas adicionais sobre o cliente (opcional)' })
  notes?: string;

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({ example: '644a1f4e5f1b2c3d4e5f6a7b', description: 'ID do funcionário que cadastrou o cliente (opcional)' })
  createdByEmployee: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'John Senior', description: 'Nome do pai do cliente (opcional)' })
  fathersName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Jane Doe', description: 'Nome da mãe do cliente (opcional)' })
  mothersName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Maria Silva, Pedro Santos', description: 'Pessoas autorizadas a realizar compras em nome do cliente (opcional)' })
  peopleAuthorized?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 3, description: 'Número de vezes que o cliente foi cobrado (opcional)' })
  timesCharged?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiPropertyOptional({ example: '2025-01-01', description: 'Data de inclusão do cliente no SPC (opcional)' })
  spcInclusionDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiPropertyOptional({ example: '2025-06-01', description: 'Data de exclusão do cliente do SPC (opcional)' })
  spcExclusionDate?: Date;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Dívida quitada', description: 'Motivo da exclusão do cliente do SPC (opcional)' })
  spcExclusionReason?: string;

  @ValidateNested()
  @Type(() => AddressDto)
  @ApiPropertyOptional({ type: AddressDto, description: 'Endereço do cliente (opcional)' })
  address?: AddressDto;
}
