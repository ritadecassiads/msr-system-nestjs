// src/supplier/supplier.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Supplier } from './schemas/supplier.schema';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { CodeGeneratorUtil } from '../common/utils/code-generator.util';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel(Supplier.name)
    private readonly supplierModel: Model<Supplier>,
  ) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const code = await CodeGeneratorUtil.generateCode(this.supplierModel);
    const newSupplier = new this.supplierModel({ ...createSupplierDto, code });
    return newSupplier.save();
  }

  async findAll(): Promise<Supplier[]> {
    return this.supplierModel.find().exec();
  }

  async findById(_id: string): Promise<Supplier> {
    const supplier = await this.supplierModel.findById(_id).exec();
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${_id} not found`);
    }
    return supplier;
  }

  async update(
    _id: string,
    updateSupplierDto: Partial<CreateSupplierDto>,
  ): Promise<Supplier> {
    const supplier = await this.supplierModel
      .findByIdAndUpdate(_id, { $set: updateSupplierDto }, { new: true })
      .exec();
    if (!supplier) {
      throw new NotFoundException('Fonecedor não encontrado');
    }
    return supplier;
  }

  async delete(_id: string): Promise<Supplier> {
    const result = await this.supplierModel.findByIdAndDelete(_id).exec();
    if (!result) {
      throw new NotFoundException('Fornecedor não encontrado');
    }
    return result;
  }
}
