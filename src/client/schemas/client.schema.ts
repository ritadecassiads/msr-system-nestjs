import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Address } from '../../address/schemas/address.schema';
import { Employee } from '../../employee/schemas/employee.schema';

@Schema({ timestamps: true })
export class Client extends Document {
  @Prop({ required: true, unique: true })
  code: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true }) // unique: true
  cpf: string;

  @Prop({ required: true }) // unique: true
  rg: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: String }) // unique: true
  email: string;

  @Prop({ default: 20000 })
  purchaseLimit: number;

  @Prop()
  notes: string;

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  createdByEmployee: Employee;

  @Prop()
  fathersName: string;

  @Prop()
  mothersName: string;

  @Prop()
  peopleAuthorized: string;

  @Prop()
  timesCharged: number;

  @Prop()
  spcInclusionDate: Date;

  @Prop()
  spcExclusionDate: Date;

  @Prop()
  spcExclusionReason: string;

  @Prop({ type: Address, _id: false })
  address: Address;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
