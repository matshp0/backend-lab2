import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/users.repository';
import { CategoryRepository } from './repositories/category.repository';
import { RecordRepository } from './repositories/record.repository';
import { PgService } from './pg.service';

@Module({
  providers: [PgService, UserRepository, CategoryRepository, RecordRepository],
  exports: [UserRepository, CategoryRepository, RecordRepository],
})
export class DataModule {}
