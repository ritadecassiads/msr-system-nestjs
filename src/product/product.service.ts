/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schemas/product.schema';
import { CodeGeneratorUtil } from 'src/common/utils/code-generator.util';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const code = await CodeGeneratorUtil.generateCode(this.productModel);
      const createdProduct = new this.productModel({
        ...createProductDto,
        code,
      });
      return await createdProduct.save();
    } catch (error) {
      if (error.code === 11000) {
        // Código de erro para duplicidade no MongoDB
        throw new ConflictException('Duplicate field value entered');
      }
      throw error;
    }
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().populate('supplierId', 'name').exec();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel
      .findById({ id })
      .populate('supplierId', 'name')
      .exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: Partial<CreateProductDto>,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findOneAndUpdate({ id }, { $set: updateProductDto }, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    return updatedProduct;
  }

  async delete(id: string): Promise<Product> {
    const result = await this.productModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException('Product not found');
    }

    return result;
  }
}
