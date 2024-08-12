import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from 'src/address/dto/address.dto';

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly cnpj: string;

  @IsString()
  @IsOptional()
  readonly phone?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly contactPerson?: string;

  @IsString()
  @IsOptional()
  readonly observations?: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;
}
