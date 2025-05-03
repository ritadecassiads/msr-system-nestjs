import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Installment, InstallmentSchema } from './installment.schema';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Invoice extends Document {
  @Prop({ required: true, unique: true })
  code: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Supplier' })
  supplierId: Types.ObjectId;

  @Prop()
  issueDate: Date; // emissão

  @Prop()
  dueDate: Date; // vencimento

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ type: [InstallmentSchema] })
  installments: Installment[];

  @Prop({
    enum: ['pending', 'paid', 'overdue'],
    default: 'pending',
  })
  status: string;

  @Prop()
  notes: string;

  @Prop()
  description: string;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
