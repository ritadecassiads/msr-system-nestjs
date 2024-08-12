import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from 'src/address/schemas/address.schema';

@Schema({ timestamps: true })
export class Supplier extends Document {
  @Prop({ required: true })
  code: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  cnpj: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  contactPerson: string;

  @Prop()
  observations: string;

  @Prop({ type: Address, _id: false })
  address: Address;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
