import { CategoryEntity } from '../../category/entities/category.entity';

export class CategoryRepository {
  private readonly storage: Map<string, CategoryEntity>;
  constructor() {
    this.storage = new Map();
  }

  getCategoryById(id: string): CategoryEntity | null {
    return this.storage.get(id) || null;
  }

  deleteCategoryById(id: string): boolean {
    return this.storage.delete(id);
  }

  createCategory(category: CategoryEntity): CategoryEntity {
    const newCategory = { ...category };
    this.storage.set(category.id, newCategory);
    return newCategory;
  }

  getAll(): CategoryEntity[] {
    return Array.from(this.storage.values());
  }
}
