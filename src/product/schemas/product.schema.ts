import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true }) // cria automaticamente os campos createdAt e updatedAt
export class Product extends Document {
  @Prop({ required: true, unique: true })
  code: number;

  @Prop({ required: true })
  name: string;

  @Prop({})
  description: string;

  @Prop({ required: true, set: (val: number) => parseFloat(val.toFixed(2)) })
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Supplier' })
  supplierId: Types.ObjectId;

  // @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }] })
  // categories: Category[];

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Category' })
  categories: Types.ObjectId[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
