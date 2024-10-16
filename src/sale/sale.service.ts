import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale } from './schemas/sale.schema';
import { CreateSaleDto } from './dto/create-sale.dto';
import { CodeGeneratorUtil } from '../common/utils/code-generator.util';
import { ValidationService } from '../validation/validation.service';

@Injectable()
export class SaleService {
  constructor(
    @InjectModel(Sale.name) private readonly saleModel: Model<Sale>,
    private readonly validationService: ValidationService,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    try {
      const code = await CodeGeneratorUtil.generateCode(this.saleModel);
      await this.validationService.validateProducts(createSaleDto.products);
      await this.validationService.validateEmployee(
        createSaleDto.openedByEmployee,
      );

      if (createSaleDto.clientId) {
        await this.validationService.validateClient(createSaleDto.clientId);
      }

      const createdSale = new this.saleModel({ ...createSaleDto, code });
      return createdSale.save();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Não foi possível cadastrar a venda',
      );
    }
  }

  async findAll(): Promise<Sale[]> {
    const sales = await this.saleModel
      .find()
      .populate({ path: 'products', select: 'name' }) // problema ao retornar os objetos de produtos
      //.populate('clientId', 'name') implementar depois
      .populate('openedByEmployee', 'name')
      .exec();

    return sales;
  }

  async findById(_id: string): Promise<Sale> {
    const sale = await this.saleModel
      .findById(_id)
      .populate({ path: 'products', select: 'name' }) // problema ao retornar os objetos de produtos
      //.populate('clientId', 'name') implementar depois
      .populate('openedByEmployee', 'name')
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
}
