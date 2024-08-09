import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from './schemas/invoice.schema';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { CodeGeneratorUtil } from 'src/common/utils/code-generator.util';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private readonly invoiceModel: Model<Invoice>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const code = await CodeGeneratorUtil.generateCode(this.invoiceModel);
    const createdInvoice = new this.invoiceModel({ ...createInvoiceDto, code });
    return createdInvoice.save();
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoiceModel.find().populate('supplierId', 'name').exec();
  }

  async findById(id: string): Promise<Invoice> {
    const invoice = await this.invoiceModel
      .findById(id)
      .populate('supplierId', 'name')
      .exec();
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return invoice;
  }

  async update(
    id: string,
    updateInvoiceDto: Partial<CreateInvoiceDto>,
  ): Promise<Invoice> {
    const updatedInvoice = await this.invoiceModel
      .findByIdAndUpdate(id, updateInvoiceDto, { new: true })
      .exec();
    if (!updatedInvoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return updatedInvoice;
  }

  async remove(id: string): Promise<Invoice> {
    const deletedInvoice = await this.invoiceModel.findByIdAndDelete(id).exec();
    if (!deletedInvoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return deletedInvoice;
  }
}
