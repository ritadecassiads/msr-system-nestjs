import { Document } from 'mongoose';

export interface WithCode extends Document {
  code: number;
}
