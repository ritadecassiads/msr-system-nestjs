import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale } from './schemas/sale.schema';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SaleService {
  constructor(
    @InjectModel(Sale.name) private readonly saleModel: Model<Sale>,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const code = await this.gereateCode();
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
    const sale = await this.saleModel.findOne({ _id }).exec();
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
      .findOneAndUpdate({ _id }, { $set: updateSaleDto }, { new: true })
      .exec();

    if (!updatedSale) {
      throw new NotFoundException('Venda não encontrada');
    }

    return updatedSale;
  }

  async delete(_id: string): Promise<void> {
    const result = await this.saleModel.deleteOne({ _id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Venda não encontrada');
    }
  }

  async gereateCode(): Promise<number> {
    const lastSale = await this.saleModel.findOne({}).sort({ code: -1 }).exec();
    return lastSale ? lastSale.code + 1 : 1;
  }
}
