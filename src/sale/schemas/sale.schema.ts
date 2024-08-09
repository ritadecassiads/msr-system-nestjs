import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Employee } from '../../employee/schemas/employee.schema';
import { Product } from '../../product/schemas/product.schema';
import { Client } from '../../client/schemas/client.schema';

@Schema()
export class Sale extends Document {
  @Prop({ unique: true })
  code: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], required: true })
  products: Product[];

  @Prop({ type: Types.ObjectId, ref: 'Client' })
  clientId: Client;

  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  sellerId: Employee;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ default: Date.now })
  saleDate: Date;

  @Prop()
  observations: string;

  @Prop({ type: String, enum: ['open', 'close'], default: 'open' })
  status: 'open' | 'close';
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
