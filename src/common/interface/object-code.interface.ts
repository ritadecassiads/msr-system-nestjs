import { Document } from 'mongoose';

export interface ObjectCode extends Document {
  code: number;
}
