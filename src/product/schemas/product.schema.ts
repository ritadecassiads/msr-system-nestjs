import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from '../../category/schemas/category.schema';
// import { Category } from '../category/schemas/category.schema';
import { Supplier } from '../../supplier/schemas/supplier.schema';

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

  @Prop({ type: Types.ObjectId, ref: 'Supplier' })
  supplierId: Supplier;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }] })
  categories: Category[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
