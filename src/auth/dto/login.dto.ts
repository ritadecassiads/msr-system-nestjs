import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'username123', description: 'Username escolhido no cadastro do funcionário' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456', description: 'Senha escolhida no cadastro do funcionário' })
  password: string;
}
