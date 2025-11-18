import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/users.repository';
import { CategoryRepository } from './repositories/category.repository';
import { RecordRepository } from './repositories/record.repository';
import { PgService } from './pg.service';
import { CurrencyRepository } from './repositories/currency.repository';

@Module({
  providers: [
    PgService,
    UserRepository,
    CategoryRepository,
    RecordRepository,
    CurrencyRepository,
  ],
  exports: [
    UserRepository,
    CategoryRepository,
    RecordRepository,
    CurrencyRepository,
  ],
})
export class DataModule {}
