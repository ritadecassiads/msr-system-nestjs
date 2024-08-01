import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type ClientDocument = Client & Document;

@Schema({ timestamps: true })
export class Client {
  @Prop({ type: Number })
  code: number;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Date, required: true })
  birthDate: Date;

  @Prop({ type: String, required: true })
  cpf: string;

  @Prop({ type: String, required: true })
  rg: string;

  //   @Prop({ type: Object, required: true })
  //   address: Record<string, any>;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Number, default: 20000 })
  purchaseLimit: number;

  @Prop({ type: String })
  observations: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdByUser: User;

  @Prop({ type: String })
  fathersName: string;

  @Prop({ type: String })
  mothersName: string;

  @Prop({ type: String })
  peopleAuthorized: string;

  @Prop({ type: Number })
  timesCharged: number;

  @Prop({ type: Date })
  spcInclusionDate: Date;

  @Prop({ type: Date })
  spcExclusionDate: Date;

  @Prop({ type: String })
  spcExclusionReason: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
