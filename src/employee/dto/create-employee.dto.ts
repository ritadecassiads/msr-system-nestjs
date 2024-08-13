import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEmail,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { AddressDto } from 'src/address/dto/address.dto';

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
}
