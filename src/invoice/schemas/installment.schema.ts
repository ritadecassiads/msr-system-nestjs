import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Installment extends Document {
  @Prop()
  dueDate: Date;

  @Prop({ set: (val: number) => parseFloat(val.toFixed(2)) })
  amount: number;

  @Prop({
    enum: ['unpaid', 'paid', 'overdue'],
    default: 'unpaid',
  })
  status: string;
}

export const InstallmentSchema = SchemaFactory.createForClass(Installment);
