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
import { ValidationService } from '../validation/validation.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly validationService: ValidationService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      await this.validationService.validateSupplier(createProductDto.supplierId);

      const code = await CodeGeneratorUtil.generateCode(this.productModel);
      const createdProduct = new this.productModel({
        ...createProductDto,
        code,
      });
      return await createdProduct.save();
    } catch (error) {
      if (error.code === 11000) {
        // Código de erro para duplic_idade no MongoDB
        throw new ConflictException('Duplicate field value entered');
      }
      throw error;
    }
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().populate('supplierId', 'name').exec();
  }

  async findById(_id: string): Promise<Product> {
    const product = await this.productModel
      .findById(_id)
      .populate('supplierId', 'name')
      .exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(
    _id: string,
    updateProductDto: Partial<CreateProductDto>,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(_id, { $set: updateProductDto }, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    return updatedProduct;
  }

  async delete(_id: string): Promise<Product> {
    const result = await this.productModel.findByIdAndDelete(_id).exec();

    if (!result) {
      throw new NotFoundException('Product not found');
    }

    return result;
  }
}
