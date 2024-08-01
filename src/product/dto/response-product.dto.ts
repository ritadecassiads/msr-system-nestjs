import { IsOptional, IsString, IsNumber } from 'class-validator';

export class ResponseProductDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  stock?: number;
}

export class ResponseMenssage {
  @IsString()
  message: string;
}
