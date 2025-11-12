import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): CategoryEntity {
    return this.categoryService.create(createCategoryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): CategoryEntity {
    return this.categoryService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.categoryService.remove(id);
  }
}
