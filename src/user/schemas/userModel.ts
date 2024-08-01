import { Document } from 'mongoose';

export class User extends Document {
  code: number;
  name: string;
  username: string;
  password: string;
  cpf: string;
  address: string;
  phone: string;
  admissionDate: Date;
  isAdmin: boolean;
}
