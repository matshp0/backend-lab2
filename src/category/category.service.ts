import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from 'src/data/repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(dto: CreateCategoryDto) {
    return await this.categoryRepository.createCategory(dto);
  }

  async findOne(id: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.getCategoryById(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.categoryRepository.deleteCategoryById(id);
    if (!deleted) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
