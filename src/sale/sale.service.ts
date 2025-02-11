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
import { Product } from 'src/product/schemas/product.schema';

@Injectable()
export class SaleService {
  constructor(
    @InjectModel(Sale.name) private readonly saleModel: Model<Sale>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly validationService: ValidationService,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    try {
      const code = await CodeGeneratorUtil.generateCode(this.saleModel);

      if (createSaleDto.clientId) {
        await this.validationService.validateClient(createSaleDto.clientId);
      }

      await this.validationService.validateEmployee(
        createSaleDto.openedByEmployee,
      );

      const productIds = createSaleDto.products.map((product) => product._id);
      await this.validationService.validateProducts(productIds);

      const createdSale = new this.saleModel({ ...createSaleDto, code });

      const savedSale = await createdSale.save();

      const result = await this.updateStockProducts(createSaleDto);

      if (result) {
        return savedSale;
      } else {
        // Se a atualização do estoque falhar, desfaz a venda
        await this.saleModel.findByIdAndDelete(savedSale._id);
        throw new InternalServerErrorException(
          'Não foi possível atualizar o estoque dos produtos',
        );
      }
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Não foi possível cadastrar a venda',
        error.message,
      );
    }
  }

  async findAll(): Promise<Sale[]> {
    const sales = await this.saleModel
      .find()
      .populate({ path: 'products', select: 'name' }) // problema ao retornar os objetos de produtos
      .populate('clientId', 'name')
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
    if (updateSaleDto.clientId) {
      await this.validationService.validateClient(updateSaleDto.clientId);
    }
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

  async updateStockProducts(sale: CreateSaleDto): Promise<boolean> {
    let result = false;
    for (const item of sale.products) {
      const product = await this.productModel.findById(item._id).exec();

      if (!product) {
        result = false;
        throw new NotFoundException(`Product with ID ${item._id} not found`);
      }
      if (product.stock === 0) {
        result = false;
        throw new BadRequestException(`Product ${product.name} out of stock`);
      }
      if (product.stock < item.quantity) {
        result = false;
        throw new Error(`Insufficient stock for product ${product.name}`);
      }
      product.stock -= item.quantity;
      await product.save();
      result = true;
    }
    return result;
  }
}
