import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
  IsMongoId,
} from 'class-validator';

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

  //   @IsNotEmpty()
  //   @IsObject()
  //   address: Record<string, any>;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsNumber()
  purchaseLimit?: number = 20000;

  @IsOptional()
  @IsString()
  observations?: string;

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
}
