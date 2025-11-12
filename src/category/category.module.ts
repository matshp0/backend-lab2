import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [DataModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
