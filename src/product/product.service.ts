/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
        const code = await this.generateCode();
        const createdProduct = new this.productModel({ ...createProductDto, code });
        return await createdProduct.save();
    } catch (error) {
      if (error.code === 11000) { // Código de erro para duplicidade no MongoDB
        throw new ConflictException('Duplicate field value entered');
      }
      throw error;
    }
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(code: string): Promise<Product> {
    const product = await this.productModel.findOne({ code }).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(code: string, updateProductDto: Partial<CreateProductDto>): Promise<Product> {
    const updatedProduct = await this.productModel.findOneAndUpdate(
      { code },
      updateProductDto,
      { new: true },
    ).exec();
    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    return updatedProduct;
  }

  async delete(code: string): Promise<void> {
    const result = await this.productModel.deleteOne({ code }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Product not found');
    }
  }

  async generateCode(): Promise<number> {
    const lastProduct = await this.productModel.findOne({}).sort({ code: -1 }).exec();
    return lastProduct ? lastProduct.code + 1 : 1;
  }
}
