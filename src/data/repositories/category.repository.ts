import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../../category/entities/category.entity';
import { PgService } from '../pg.service';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(private readonly pgService: PgService) {}

  async getCategoryById(id: string): Promise<CategoryEntity | null> {
    const category = await this.pgService.kysley
      .selectFrom('category')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();
    return category ?? null;
  }

  async deleteCategoryById(id: string): Promise<boolean> {
    const deleted = await this.pgService.kysley
      .deleteFrom('category')
      .where('id', '=', id)
      .executeTakeFirst();
    return !!deleted.numDeletedRows;
  }

  async createCategory(category: CreateCategoryDto) {
    return await this.pgService.kysley
      .insertInto('category')
      .values(category)
      .returningAll()
      .executeTakeFirst();
  }

  async getAll(): Promise<CategoryEntity[]> {
    return await this.pgService.kysley
      .selectFrom('category')
      .selectAll()
      .execute();
  }
}
