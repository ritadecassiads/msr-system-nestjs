import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEmail,
  ValidateNested,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AddressDto } from '../../address/dto/address.dto';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John Doe', description: 'Nome completo do funcionário' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'johndoe', description: 'Nome de usuário único para login' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'password123', description: 'Senha do funcionário para login' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123.456.789-00', description: 'CPF do funcionário' })
  cpf: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(11, { message: 'O Telefone não pode ter mais que 11 caracteres.' })
  @ApiProperty({ example: '11987654321', description: 'Número de telefone do funcionário (máximo 11 caracteres)' })
  phone: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({ example: 'johndoe@example.com', description: 'Endereço de e-mail do funcionário' })
  email?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ example: false, description: 'Indica se o funcionário tem privilégios de administrador' })
  isAdmin?: boolean;

  @ValidateNested()
  @Type(() => AddressDto)
  @ApiPropertyOptional({ type: AddressDto, description: 'Endereço do funcionário' })
  address?: AddressDto;
}
