import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { ResponseMenssage } from './dto/response-sale.dto';
import { Sale } from './schemas/sale.schema';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto): Promise<Sale> {
    return this.saleService.create(createSaleDto);
  }

  @Get()
  async findAll(): Promise<Sale[]> {
    return this.saleService.findAll();
  }

  @Get(':code')
  async findOne(@Param('code') code: number): Promise<Sale> {
    const sale = await this.saleService.findOne(code);
    if (!sale) {
      throw new NotFoundException('Venda não encontrada');
    }
    return sale;
  }

  @Put(':code')
  async update(
    @Param('code') code: number,
    @Body() updateSaleDto: Partial<CreateSaleDto>,
  ): Promise<ResponseMenssage> {
    await this.saleService.update(code, updateSaleDto);
    return { message: 'Venda atualizada com sucesso' };
  }

  @Delete(':code')
  async delete(@Param('code') code: number): Promise<ResponseMenssage> {
    await this.saleService.delete(code);
    return { message: 'Venda deletada com sucesso' };
  }
}
