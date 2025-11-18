import { GetAllRecordsFilter } from 'src/record/dto/get-all-records-filter.dto';
import { RecordEntity } from '../../record/entities/record.entity';
import { Injectable } from '@nestjs/common';
import { PgService } from '../pg.service';
import { CreateRecordDto } from 'src/record/dto/create-record.dto';

@Injectable()
export class RecordRepository {
  constructor(private readonly pgService: PgService) {}

  async getRecordById(id: string): Promise<RecordEntity | null> {
    const record = await this.pgService.kysley
      .selectFrom('record')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();
    return record ?? null;
  }

  async deleteRecordById(id: string): Promise<boolean> {
    const deleted = await this.pgService.kysley
      .deleteFrom('record')
      .where('id', '=', id)
      .executeTakeFirstOrThrow();
    return !!deleted.numDeletedRows;
  }

  async createRecord(record: CreateRecordDto) {
    return await this.pgService.kysley
      .insertInto('record')
      .values(record)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async getAll(filter: GetAllRecordsFilter): Promise<RecordEntity[]> {
    const query = this.pgService.kysley.selectFrom('record').selectAll();
    if (filter.categoryId !== undefined) {
      query.where('categoryId', '=', filter.categoryId);
    }
    if (filter.userId !== undefined) {
      query.where('userId', '=', filter.userId);
    }
    return await query.execute();
  }
}
