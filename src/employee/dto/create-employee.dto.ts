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
import { AddressDto } from '../../address/dto/address.dto';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(11, { message: 'O Telefone não pode ter mais que 11 caracteres.' })
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;

  @ValidateNested() // validação aninhada
  @Type(() => AddressDto)
  address?: AddressDto;

  //admissionDate
}
