import {
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
  IsObject,
} from 'class-validator';
import { Employee } from 'src/employee/schemas/employee.schema';

export class ClientResponseDto {
  @IsOptional()
  @IsNumber()
  code?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDate()
  birthDate?: Date;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsString()
  rg?: string;

  //   @IsOptional()
  //   @IsObject()
  //   address?: Record<string, any>;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsNumber()
  purchaseLimit?: number;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsObject()
  createdByEmployee?: Employee;

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
  spcInclusionDate?: Date;

  @IsOptional()
  @IsDate()
  spcExclusionDate?: Date;

  @IsOptional()
  @IsString()
  spcExclusionReason?: string;
}
