import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from '../product/schemas/product.schema';
import { Client } from '../client/schemas/client.schema';
import { Employee } from '../employee/schemas/employee.schema';
import { Supplier } from '../supplier/schemas/supplier.schema';
import { Category } from '../category/schemas/category.schema';

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

  async validateEmployee(openedByEmployee: string): Promise<void> {
    const seller = await this.employeeModel.findById(openedByEmployee).exec();
    if (!seller) {
      throw new NotFoundException('Vendedor não encontrado.');
    }
  }

  async validateSupplier(supplierId: string): Promise<void> {
    const seller = await this.supplierModel.findById(supplierId).exec();
    if (!seller) {
      throw new NotFoundException('Fornecedor não encontrado.');
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

  async validateCpf(cpf: string): Promise<boolean> {
    // Remove todos os caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, '');

    // Validações iniciais
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    let sum: number;
    let remainder: number;

    // Verificação do primeiro dígito verificador
    sum = 0;
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    // Verificação do segundo dígito verificador
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cpf.substring(10, 11))) {
      return false;
    }

    return true;
  }

  async validateCnpj(cnpj: string): Promise<boolean> {
    cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove qualquer caracter que não seja número

    if (cnpj.length !== 14) return false;

    // Elimina CNPJs inválidos conhecidos
    if (
      cnpj === '00000000000000' ||
      cnpj === '11111111111111' ||
      cnpj === '22222222222222' ||
      cnpj === '33333333333333' ||
      cnpj === '44444444444444' ||
      cnpj === '55555555555555' ||
      cnpj === '66666666666666' ||
      cnpj === '77777777777777' ||
      cnpj === '88888888888888' ||
      cnpj === '99999999999999'
    ) {
      return false;
    }

    // Valida DVs
    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    const digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != parseInt(digits.charAt(0))) return false;

    length = length + 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != parseInt(digits.charAt(1))) return false;

    return true;
  }
}
