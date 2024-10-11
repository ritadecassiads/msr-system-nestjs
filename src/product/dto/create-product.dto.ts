import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsMongoId,
  IsArray,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Nome deve ser preenchido.' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsMongoId()
  supplierId?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  categories?: string[];
}
