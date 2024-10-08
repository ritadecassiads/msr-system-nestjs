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
import { AddressDto } from '../../address/dto/address.dto';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date) // Garante que o valor seja transformado para uma instância de Date
  birthDate: Date;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  rg: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(11, { message: 'O Telefone não pode ter mais que 11 caracteres.' })
  phone: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsNumber()
  purchaseLimit?: number = 10000;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsMongoId()
  createdByEmployee: string;

  @IsOptional()
  @IsString()
  fathersName?: string;

  @IsOptional()
  @IsString()
  mothersName?: string;

  @IsOptional()
  @IsString()
  peopleAuthorized?: string;

  @IsOptional()
  @IsNumber()
  timesCharged?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  spcInclusionDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  spcExclusionDate?: Date;

  @IsOptional()
  @IsString()
  spcExclusionReason?: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;
}
