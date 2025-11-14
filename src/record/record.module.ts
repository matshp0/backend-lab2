import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [DataModule],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
