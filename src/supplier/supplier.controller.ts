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
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './schemas/supplier.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseDto } from '../common/dto/response.dto';

@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createSupplierDto: CreateSupplierDto,
  ): Promise<ResponseDto<Supplier>> {
    const createdSupplier =
      await this.supplierService.create(createSupplierDto);
    return new ResponseDto('Fornecedor criado com sucesso', createdSupplier);
  }

  @Get()
  async findAll() {
    return this.supplierService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.supplierService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ): Promise<ResponseDto<Supplier>> {
    const updatedSupplier = await this.supplierService.update(
      id,
      updateSupplierDto,
    );
    return new ResponseDto(
      'Fornecedor atualizado com sucesso',
      updatedSupplier,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<ResponseDto<Supplier>> {
    const deletedSupplier = await this.supplierService.delete(id);
    return new ResponseDto('Fornecedor deletado com sucesso', deletedSupplier);
  }
}
