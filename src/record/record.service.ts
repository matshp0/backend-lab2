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
import { CurrencyRepository } from 'src/data/repositories/currency.repository';

@Injectable()
export class RecordService {
  constructor(
    private readonly recordRepository: RecordRepository,
    private readonly userRepository: UserRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly currencyRepository: CurrencyRepository,
  ) {}

  async create(dto: CreateRecordDto) {
    const { userId, categoryId, currencyCode } = dto;
    const [user, category] = await Promise.all([
      this.userRepository.getUserById(userId),
      this.categoryRepository.getCategoryById(categoryId),
    ]);
    if (!user)
      throw new BadRequestException(`User with ${userId} id does not exist`);
    if (!category)
      throw new BadRequestException(
        `Category with ${categoryId} id does not exist`,
      );
    if (currencyCode) {
      const currency =
        await this.currencyRepository.getCurrencyByCode(currencyCode);
      if (!currency)
        throw new BadRequestException(
          `Currency with code ${currencyCode} does not exist`,
        );
    }
    const finalCurrencyCode = currencyCode ?? user.defaultCurrencyCode;
    if (!finalCurrencyCode)
      throw new BadRequestException(
        'No currency specified and user has no default currency',
      );
    return this.recordRepository.createRecord({
      ...dto,
      currencyCode: finalCurrencyCode,
    });
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
