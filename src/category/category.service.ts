import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from 'src/data/repositories/category.repository';
import { randomUUID } from 'crypto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  create(createCategoryDto: CreateCategoryDto): CategoryEntity {
    const id = randomUUID();
    return this.categoryRepository.createCategory({ id, ...createCategoryDto });
  }

  findOne(id: string): CategoryEntity {
    const category = this.categoryRepository.getCategoryById(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  remove(id: string): void {
    const deleted = this.categoryRepository.deleteCategoryById(id);
    if (!deleted) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
