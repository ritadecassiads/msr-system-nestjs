import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from '../product/schemas/product.schema';
import { Client } from '../client/schemas/client.schema';
import { Employee } from '../employee/schemas/employee.schema';
import { Supplier } from 'src/supplier/schemas/supplier.schema';
import { Category } from 'src/category/schemas/category.schema';

@Injectable()
export class ValidationService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
    @InjectModel(Supplier.name) private readonly supplierModel: Model<Supplier>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async validateProducts(productIds: string[]): Promise<void> {
    const products = await this.productModel
      .find({ _id: { $in: productIds.map((id) => new Types.ObjectId(id)) } })
      .exec(); // buscando os produtos e validando no $in se o id encontrado está presente no array de productIds
    if (products.length !== productIds.length) {
      throw new NotFoundException('Um ou mais produtos não encontrados.');
    }
  }

  async validateProduct(productId: string): Promise<void> {
    const client = await this.clientModel.findById(productId).exec();
    if (!client) {
      throw new NotFoundException('Cliente não encontrado.');
    }
  }

  async validateClient(clientId: string): Promise<void> {
    const client = await this.clientModel.findById(clientId).exec();
    if (!client) {
      throw new NotFoundException('Cliente não encontrado.');
    }
  }

  async validateEmployee(sellerId: string): Promise<void> {
    const seller = await this.employeeModel.findById(sellerId).exec();
    if (!seller) {
      throw new NotFoundException('Vendedor não encontrado.');
    }
  }

  async validateSupplier(supplierId: string): Promise<void> {
    const seller = await this.supplierModel.findById(supplierId).exec();
    if (!seller) {
      throw new NotFoundException('Vendedor não encontrado.');
    }
  }

  async validateCategories(categoriesIds: string[]): Promise<void> {
    const categories = await this.categoryModel
      .find({ _id: { $in: categoriesIds.map((id) => new Types.ObjectId(id)) } })
      .exec(); // crio um array de objectId com map + busco no .find os _ids validando no $in se o id encontrado está presente no array de categoriesIds
    if (categories.length !== categoriesIds.length) {
      throw new NotFoundException('Uma ou mais categorias não encontradas.');
    }
  }
}
