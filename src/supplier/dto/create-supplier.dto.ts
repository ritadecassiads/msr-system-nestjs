import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly cnpj: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

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
}
