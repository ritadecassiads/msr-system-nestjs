import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Supplier } from '../../supplier/schemas/supplier.schema'; // Assumindo que a entidade fornecedor é chamada Supplier

@Schema({ timestamps: true })
export class Invoice extends Document {
  @Prop({ required: true, unique: true })
  code: number;

  @Prop({ type: Types.ObjectId, ref: 'Supplier' })
  supplierId: Supplier;

  @Prop({ required: true })
  issueDate: Date; // emissão

  @Prop({ required: true })
  dueDate: Date; // vencimento

  @Prop({ required: true })
  amount: number;

  @Prop()
  installments: number; // parcelas

  @Prop()
  installmentAmounts: number[];

  @Prop({ required: true, enum: ['open', 'paid', 'overdue'], default: 'open' })
  status: string;

  @Prop()
  notes: string;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
