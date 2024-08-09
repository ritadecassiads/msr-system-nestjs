// src/supplier/supplier.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './schemas/supplier.schema';

@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  async create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  async findAll() {
    return this.supplierService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.supplierService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ): Promise<{ message: string; supplier?: Supplier }> {
    const updatedSupplier = await this.supplierService.update(
      id,
      updateSupplierDto,
    );

    if (!updatedSupplier) {
      throw new NotFoundException('Fornecedor não encontrado');
    }
    return {
      message: 'Fornecedor atualizado com sucesso',
      supplier: updatedSupplier,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.supplierService.delete(id);
    return { message: 'Fornecedor deletado com sucesso' };
  }
}
