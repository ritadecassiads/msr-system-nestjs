import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  readonly street: string;

  @IsString()
  @IsNotEmpty()
  readonly number: string;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  readonly state: string;

  @IsString()
  @IsNotEmpty()
  readonly postalCode: string;

  @IsString()
  @IsOptional()
  readonly country?: string;
}
