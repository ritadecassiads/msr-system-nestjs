export class UserResponseDto {
  code?: number;
  name?: string;
  username?: string;
  cpf?: string;
  address?: string;
  phone?: string;
  admissionDate?: Date;
  isAdmin?: boolean;
}

export class ResponseMenssage {
  message: string;
}
