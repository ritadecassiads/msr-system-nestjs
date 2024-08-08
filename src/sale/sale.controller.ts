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

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Sale> {
    const sale = await this.saleService.findById(id);
    if (!sale) {
      throw new NotFoundException('Venda não encontrada');
    }
    return sale;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSaleDto: Partial<CreateSaleDto>,
  ): Promise<ResponseMenssage> {
    await this.saleService.update(id, updateSaleDto);
    return { message: 'Venda atualizada com sucesso' };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseMenssage> {
    await this.saleService.delete(id);
    return { message: 'Venda deletada com sucesso' };
  }
}
