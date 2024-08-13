import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schemas/product.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseDto } from 'src/common/dto/response.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ResponseDto<Product>> {
    const createdProduct = await this.productService.create(createProductDto);
    return new ResponseDto('Produto criado com sucesso', createdProduct);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Product> {
    return this.productService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: Partial<CreateProductDto>,
  ): Promise<ResponseDto<Product>> {
    const updatedProduct = await this.productService.update(
      id,
      updateProductDto,
    );
    return new ResponseDto('Produto atualizado com sucesso', updatedProduct);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<ResponseDto<Product>> {
    const deletedProduct = await this.productService.delete(id);
    return new ResponseDto('Produto deletado com sucesso', deletedProduct);
  }
}
