import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/users.repository';
import { CategoryRepository } from './repositories/category.repository';

@Module({
  providers: [UserRepository, CategoryRepository],
  exports: [UserRepository, CategoryRepository],
})
export class DataModule {}
