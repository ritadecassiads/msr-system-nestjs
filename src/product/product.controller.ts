import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schemas/product.schema';
import { ResponseMenssage } from './dto/response-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':code')
  async findOne(@Param('code') code: string): Promise<Product> {
    return this.productService.findOne(code);
  }

  @Put(':code')
  async update(
    @Param('code') code: string,
    @Body() updateProductDto: Partial<CreateProductDto>,
  ): Promise<ResponseMenssage> {
    this.productService.update(code, updateProductDto);
    return { message: 'Produto alterado com sucesso' };
  }

  @Delete(':code')
  async remove(@Param('code') code: string): Promise<ResponseMenssage> {
    this.productService.remove(code);
    return { message: 'Produto excluído com sucesso' };
  }
}
