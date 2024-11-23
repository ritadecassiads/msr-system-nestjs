import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Employee } from '../../employee/schemas/employee.schema';
import { Client } from '../../client/schemas/client.schema';
import { SaleProduct, SaleProductSchema } from './sale-product.schema';

@Schema({ timestamps: true })
export class Sale extends Document {
  @Prop({ required: true, unique: true })
  code: number;

  @Prop({ type: [SaleProductSchema], required: true })
  products: SaleProduct[];

  @Prop({ type: Types.ObjectId, ref: 'Client' })
  clientId: Client;

  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  openedByEmployee: Employee;

  @Prop({ type: Types.ObjectId, ref: 'Employee' }) // incluri required depois
  closedByEmployee: Employee;

  @Prop({ required: true })
  itensQuantity: number;

  @Prop({ required: true })
  total: number;

  @Prop()
  notes: string;

  @Prop({ type: String, enum: ['open', 'closed'], default: 'open' })
  status: 'open' | 'closed' | 'canceled';

  @Prop({
    type: String,
    enum: ['credit', 'debit', 'cash', 'pix', 'bankTransfer', 'other'],
  })
  paymentMethod: string;

  discount: number;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
