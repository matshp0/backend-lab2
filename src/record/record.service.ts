import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RecordEntity } from './entities/record.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordRepository } from 'src/data/repositories/record.repository';
import { randomUUID } from 'crypto';
import { GetAllRecordsFilter } from './dto/get-all-records-filter.dto';

@Injectable()
export class RecordService {
  constructor(private readonly recordRepository: RecordRepository) {}

  create(createRecordDto: CreateRecordDto): RecordEntity {
    const id = randomUUID();
    const newRecord: RecordEntity = {
      id,
      ...createRecordDto,
      created_at: new Date(),
    };
    return this.recordRepository.createRecord(newRecord);
  }

  findOne(id: string): RecordEntity {
    const record = this.recordRepository.getRecordById(id);
    if (!record) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }
    return record;
  }

  remove(id: string): void {
    const deleted = this.recordRepository.deleteRecordById(id);
    if (!deleted) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }
  }

  findAll(filter: GetAllRecordsFilter) {
    if (!Object.values(filter).some((value) => value !== undefined))
      throw new BadRequestException('At least one filter is required');
    return this.recordRepository.getAll(filter);
  }
}
