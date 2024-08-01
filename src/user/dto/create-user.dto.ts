//import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  //@Prop({ unique: true })
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  // @IsEmail()
  // email: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsBoolean()
  isAdmin: boolean;
}
