import { GetAllRecordsFilter } from 'src/record/dto/get-all-records-filter.dto';
import { RecordEntity } from '../../record/entities/record.entity';

export class RecordRepository {
  private readonly storage: Map<string, RecordEntity>;
  constructor() {
    this.storage = new Map();
  }

  getRecordById(id: string): RecordEntity | null {
    return this.storage.get(id) || null;
  }

  deleteRecordById(id: string): boolean {
    return this.storage.delete(id);
  }

  createRecord(record: RecordEntity): RecordEntity {
    const newRecord = { ...record };
    this.storage.set(record.id, newRecord);
    return newRecord;
  }

  getAll(filter: GetAllRecordsFilter): RecordEntity[] {
    return Array.from(this.storage.values()).filter((entity) =>
      Object.entries(filter).every(
        ([key, value]) =>
          value === undefined || entity[key as keyof RecordEntity] === value,
      ),
    );
  }
}
