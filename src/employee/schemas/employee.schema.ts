import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from '../../address/schemas/address.schema';

@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop({ required: true, unique: true })
  code: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true }) // unique: true
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true }) // unique: true
  cpf: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  admissionDate: Date;

  @Prop({ type: Boolean, default: false })
  isAdmin: boolean;

  @Prop({ type: Address, _id: false })
  address: Address;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
