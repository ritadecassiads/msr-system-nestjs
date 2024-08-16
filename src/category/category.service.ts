import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CodeGeneratorUtil } from '../common/utils/code-generator.util';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const code = await CodeGeneratorUtil.generateCode(this.categoryModel);
    const createdCategory = new this.categoryModel({
      ...createCategoryDto,
      code,
    });
    return createdCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findById(_id: string): Promise<Category> {
    const category = await this.categoryModel.findById(_id).exec();
    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }
    return category;
  }

  async update(
    _id: string,
    updateCategoryDto: Partial<CreateCategoryDto>,
  ): Promise<Category> {
    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(_id, updateCategoryDto, { new: true })
      .exec();
    if (!updatedCategory) {
      throw new NotFoundException('Categoria não encontrada');
    }
    return updatedCategory;
  }

  async delete(_id: string): Promise<Category> {
    const result = await this.categoryModel.findByIdAndDelete(_id).exec();
    if (!result) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return result;
  }
}
