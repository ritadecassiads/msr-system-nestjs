import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from './schemas/invoice.schema';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { CodeGeneratorUtil } from 'src/common/utils/code-generator.util';
import { ValidationService } from 'src/validation/validation.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private readonly invoiceModel: Model<Invoice>,
    private readonly validationService: ValidationService,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    try {
      await this.validationService.validateSupplier(
        createInvoiceDto.supplierId,
      );
      const code = await CodeGeneratorUtil.generateCode(this.invoiceModel);
      const createdInvoice = new this.invoiceModel({
        ...createInvoiceDto,
        code,
      });
      return createdInvoice.save();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Não foi possível cadastrar a duplicata',
      );
    }
  }

  async findAll(): Promise<Invoice[]> {
    const invoces = await this.invoiceModel
      .find()
      .populate('supplierId', 'name')
      .exec();
    if (!invoces) {
      throw new NotFoundException('Duplicatas não encontradas');
    }
    return invoces;
  }

  async findById(_id: string): Promise<Invoice> {
    const invoice = await this.invoiceModel
      .findById(_id)
      .populate('supplierId', 'name')
      .exec();
    if (!invoice) {
      throw new NotFoundException('Duplicata não encontrada');
    }
    return invoice;
  }

  async update(
    _id: string,
    updateInvoiceDto: Partial<CreateInvoiceDto>,
  ): Promise<Invoice> {
    const updatedInvoice = await this.invoiceModel
      .findByIdAndUpdate(_id, updateInvoiceDto, { new: true }) // mongoose retorna o item após a atualização
      .exec();
    if (!updatedInvoice) {
      throw new NotFoundException('Duplicata não encontrada');
    }
    return updatedInvoice;
  }

  async delete(_id: string): Promise<Invoice> {
    const deletedInvoice = await this.invoiceModel
      .findByIdAndDelete(_id)
      .exec();
    if (!deletedInvoice) {
      throw new NotFoundException('Duplicata não encontrada');
    }
    return deletedInvoice;
  }
}
