import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/users.repository';
import { CategoryRepository } from './repositories/category.repository';
import { RecordRepository } from './repositories/record.repository';

@Module({
  providers: [UserRepository, CategoryRepository, RecordRepository],
  exports: [UserRepository, CategoryRepository, RecordRepository],
})
export class DataModule {}
