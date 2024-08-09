import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop({ unique: true })
  code: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  cpf: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop()
  admissionDate: Date;

  @Prop()
  isAdmin: boolean;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
