import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SaleProduct extends Document {
  @Prop({ required: true })
  code: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  unitPrice: number;

  @Prop({ required: true, set: (val: number) => parseFloat(val.toFixed(2)) })
  totalPrice: number;

  @Prop({ required: true })
  quantity: number;
}

export const SaleProductSchema = SchemaFactory.createForClass(SaleProduct);
