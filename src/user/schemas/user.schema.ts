import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// gera automaticamente o createdAt e uptadedAt
@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  code: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  cpf: string;

  // @Prop()
  // email: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ default: Date.now })
  admissionDate: Date;

  @Prop()
  isAdmin: boolean;

  // @Prop({ type: [SaleSchema] })
  // sales: Sale[];
}

export const UserSchema = SchemaFactory.createForClass(User);
