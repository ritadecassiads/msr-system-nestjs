import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SaleProduct, SaleProductSchema } from './sale-product.schema';
import { Schema as MongooseSchema } from 'mongoose';
import { Installment, InstallmentSchema } from 'src/invoice/schemas/installment.schema';

@Schema({ timestamps: true })
export class Sale extends Document {
  @Prop({ required: true, unique: true })
  code: number;

  @Prop({ type: [SaleProductSchema], required: true })
  products: SaleProduct[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Client' })
  clientId: Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  })
  openedByEmployee: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Employee' }) // incluri required depois
  closedByEmployee: Types.ObjectId;

  @Prop({ required: true })
  itensQuantity: number;

  @Prop({ required: true, set: (val: number) => parseFloat(val.toFixed(2)) })
  total: number;

  @Prop()
  notes: string;

  @Prop({ type: String, enum: ['open', 'closed'], default: 'open' })
  status: 'open' | 'closed' | 'canceled';

  @Prop({
    type: String,
    enum: [
      'credit-card',
      'debit-card',
      'cash',
      'cash',
      'pix',
      'bank-transfer',
      'client-account',
    ],
  })
  paymentMethod: string;

  discount: number;

  @Prop({ type: [InstallmentSchema] })
  installments: Installment[];
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
