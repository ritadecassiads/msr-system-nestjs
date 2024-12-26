import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Supplier } from '../../supplier/schemas/supplier.schema'; // Assumindo que a entidade fornecedor é chamada Supplier
import { Installment, InstallmentSchema } from './installment.schema';

@Schema({ timestamps: true })
export class Invoice extends Document {
  @Prop({ required: true, unique: true })
  code: number;

  @Prop({ type: Types.ObjectId, ref: 'Supplier' })
  supplierId: Supplier;

  @Prop()
  issueDate: Date; // emissão

  @Prop()
  dueDate: Date; // vencimento

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ type: [InstallmentSchema], _id: false })
  installments: Installment[];

  @Prop({
    enum: ['unpaid', 'paid', 'overdue'],
    default: 'unpaid',
  })
  status: string;

  @Prop()
  notes: string;

  @Prop()
  description: string;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
