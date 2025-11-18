import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RecordEntity } from './entities/record.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordRepository } from 'src/data/repositories/record.repository';
import { GetAllRecordsFilter } from './dto/get-all-records-filter.dto';
import { UserRepository } from 'src/data/repositories/users.repository';
import { CategoryRepository } from 'src/data/repositories/category.repository';

@Injectable()
export class RecordService {
  constructor(
    private readonly recordRepository: RecordRepository,
    private readonly userRepository: UserRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(dto: CreateRecordDto) {
    const { userId, categoryId } = dto;
    const [existingUser, exisitingCategory] = await Promise.all([
      this.userRepository.getUserById(userId),
      this.categoryRepository.getCategoryById(categoryId),
    ]);
    if (!existingUser)
      throw new BadRequestException(`User with ${userId} id does not exist`);
    if (!exisitingCategory)
      throw new BadRequestException(
        `Category with ${categoryId} id does not exist`,
      );
    return this.recordRepository.createRecord(dto);
  }

  async findOne(id: string): Promise<RecordEntity> {
    const record = await this.recordRepository.getRecordById(id);
    if (!record) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }
    return record;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.recordRepository.deleteRecordById(id);
    if (!deleted) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }
  }

  async findAll(filter: GetAllRecordsFilter) {
    if (!Object.values(filter).some((value) => value !== undefined))
      throw new BadRequestException('At least one filter is required');
    return await this.recordRepository.getAll(filter);
  }
}
