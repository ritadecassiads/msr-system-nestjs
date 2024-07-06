import { IsString, IsOptional } from 'class-validator';
// talvez possa apagar
export class UpdateAuthDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
