import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Supplier extends Document {
  @Prop({ required: true })
  code: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  cnpj: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  contactPerson: string;

  @Prop()
  observations: string;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
