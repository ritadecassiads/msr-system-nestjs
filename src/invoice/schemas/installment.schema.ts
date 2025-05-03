import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Installment extends Document {
  @Prop()
  dueDate: Date;

  @Prop({ set: (val: number) => parseFloat(val.toFixed(2)) })
  amount: number;

  @Prop({
    enum: ['pending', 'paid', 'overdue'],
    default: 'pending',
  })
  status: string;

  @Prop()
  paymentDate: Date;

  @Prop({
    type: String,
    enum: [
      'credit-card',
      'debit-card',
      'cash',
      'cash',
      'pix',
      'bank-transfer'
    ],
  })
  paymentMethod: string;
}

export const InstallmentSchema = SchemaFactory.createForClass(Installment);
