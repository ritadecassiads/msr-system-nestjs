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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './schemas/category.schema';
import { ResponseDto } from '../common/dto/response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ResponseDto<Category>> {
    const createdCategory =
      await this.categoryService.create(createCategoryDto);
    return new ResponseDto('Categoria criada com sucesso', createdCategory);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: Partial<CreateCategoryDto>,
  ): Promise<ResponseDto<Category>> {
    const updatedCategory = await this.categoryService.update(
      id,
      updateCategoryDto,
    );
    return new ResponseDto('Categoria atualizada com sucesso', updatedCategory);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<ResponseDto<Category>> {
    const deletedCategory = await this.categoryService.delete(id);
    return new ResponseDto('Categoria deletada com sucesso', deletedCategory);
  }
}
