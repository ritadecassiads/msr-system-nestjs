import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Supplier } from '../../supplier/schemas/supplier.schema'; // Assumindo que a entidade fornecedor é chamada Supplier

@Schema()
export class Invoice extends Document {
  @Prop({ required: true, unique: true })
  code: number;

  @Prop({ type: Types.ObjectId, ref: 'Supplier', required: true })
  supplier: Supplier;

  @Prop({ required: true })
  issueDate: Date;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, enum: ['open', 'paid', 'overdue'], default: 'open' })
  status: string;

  @Prop()
  notes: string;

  // codigo do funcionario
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
