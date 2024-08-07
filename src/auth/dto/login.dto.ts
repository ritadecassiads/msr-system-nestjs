import { IsString, IsNotEmpty } from 'class-validator';

// objeto que define a estrutura dos dados que são transferidos entre diferentes partes do aplicativo
// são usados para definir e validar os dados que são enviados em requisições HTTP (como dados enviados em um POST ou PUT)
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
