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

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: Partial<CreateProductDto>,
  ): Promise<ResponseMenssage> {
    this.productService.update(id, updateProductDto);
    return { message: 'Produto alterado com sucesso' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseMenssage> {
    this.productService.delete(id);
    return { message: 'Produto excluído com sucesso' };
  }
}
