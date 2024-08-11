import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale } from './schemas/sale.schema';
import { CreateSaleDto } from './dto/create-sale.dto';
import { CodeGeneratorUtil } from 'src/common/utils/code-generator.util';
import { ValidationService } from '../validation/validation.service';

@Injectable()
export class SaleService {
  constructor(
    @InjectModel(Sale.name) private readonly saleModel: Model<Sale>,
    private readonly validationService: ValidationService,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const code = await CodeGeneratorUtil.generateCode(this.saleModel);

    await this.validationService.validateProducts(createSaleDto.products);
    await this.validationService.validateClient(createSaleDto.clientId);
    await this.validationService.validateEmployee(createSaleDto.sellerId);

    const createdSale = new this.saleModel({ ...createSaleDto, code });
    return createdSale.save();
  }

  async findAll(): Promise<Sale[]> {
    const sales = await this.saleModel
      .find()
      .populate({ path: 'products', select: 'name' }) // problema ao retornar os objetos de produtos
      .populate('clientId', 'name')
      .populate('sellerId', 'name')
      .exec();

    return sales;
  }

  async findById(_id: string): Promise<Sale> {
    const sale = await this.saleModel
      .findById(_id)
      .populate({ path: 'products', select: 'name' }) // problema ao retornar os objetos de produtos
      .populate('clientId', 'name')
      .populate('sellerId', 'name')
      .exec();
    if (!sale) {
      throw new NotFoundException('Venda não encontrada');
    }
    return sale;
  }

  async update(
    _id: string,
    updateSaleDto: Partial<CreateSaleDto>,
  ): Promise<Sale> {
    const updatedSale = await this.saleModel
      .findByIdAndUpdate(_id, { $set: updateSaleDto }, { new: true })
      .exec();

    if (!updatedSale) {
      throw new NotFoundException('Venda não encontrada');
    }

    return updatedSale;
  }

  async delete(_id: string): Promise<Sale> {
    const result = await this.saleModel.findByIdAndDelete(_id).exec();
    if (!result) {
      throw new NotFoundException('Venda não encontrada');
    }
    return result;
  }

  // private async validateProducts(saleProductIds: string[]): Promise<void> {
  //   const productsIds = saleProductIds.map((id) => new Types.ObjectId(id)); // convertendo para ObjectId

  //   const products = await this.productModel.find({
  //     _id: { $in: productsIds },
  //   }); // buscando os produtos e validando no $in se o id encontrado está presente no array de productIds
  //   if (products.length !== productsIds.length) {
  //     throw new NotFoundException('Um ou mais produtos não encontrados.');
  //   }
  // }

  // private async validateClient(clientId: string): Promise<void> {
  //   const client = await this.clientModel.findById(clientId).exec();
  //   if (!client) {
  //     throw new NotFoundException('Cliente não encontrado.');
  //   }
  // }

  // private async validateSeller(sellerId: string): Promise<void> {
  //   const seller = await this.employeeModel.findById(sellerId).exec();
  //   if (!seller) {
  //     throw new NotFoundException('Vendedor não encontrado.');
  //   }
  // }
}
