import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './schemas/invoice.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseDto } from '../common/dto/response.dto';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createInvoiceDto: CreateInvoiceDto,
  ): Promise<ResponseDto<Invoice>> {
    const newInvoice = await this.invoiceService.create(createInvoiceDto);
    return new ResponseDto('Invoice criado com sucesso', newInvoice);
  }

  @Get()
  async findAll(): Promise<Invoice[]> {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Invoice> {
    return this.invoiceService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: Partial<CreateInvoiceDto>,
  ): Promise<ResponseDto<Invoice>> {
    const updatedInvoice = await this.invoiceService.update(
      id,
      updateInvoiceDto,
    );

    return new ResponseDto('Invoice atualizado com sucesso', updatedInvoice);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<ResponseDto<Invoice>> {
    const deletecInvoice = await this.invoiceService.delete(id);
    return new ResponseDto('Invoice deletado com sucesso', deletecInvoice);
  }
}
