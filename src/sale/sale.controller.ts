import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { Sale } from './schemas/sale.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseDto } from '../common/dto/response.dto';
import { InstallmentDto } from 'src/installment/dto/installment.dto';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createSaleDto: CreateSaleDto,
  ): Promise<ResponseDto<Sale>> {
    const createdSale = await this.saleService.create(createSaleDto);
    return new ResponseDto('Venda criada com sucesso', createdSale);
  }

  @Get()
  async findAll(): Promise<Sale[]> {
    return this.saleService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Sale> {
    const sale = await this.saleService.findById(id);
    return sale;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateSaleDto: Partial<CreateSaleDto>,
  ): Promise<ResponseDto<Sale>> {
    const updatedSale = await this.saleService.update(id, updateSaleDto);
    return new ResponseDto('Venda atualizada com sucesso', updatedSale);
  }

  @Patch(':id/installment')
  @UseGuards(JwtAuthGuard)
  async updateInstallmentStatus(
    @Param('id') saleId: string,
    @Body() updateInstallmentDto: InstallmentDto,
  ): Promise<ResponseDto<Sale>> {
    const updatedSale = await this.saleService.updateInstallmentStatus(saleId, updateInstallmentDto);
    return new ResponseDto('Parcela atualizada com sucesso', updatedSale);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<ResponseDto<Sale>> {
    const deletedSale = await this.saleService.delete(id);
    return new ResponseDto('Venda deletada com sucesso', deletedSale);
  }
}
