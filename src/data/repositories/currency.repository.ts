import { Injectable } from '@nestjs/common';
import { PgService } from '../pg.service';

@Injectable()
export class CurrencyRepository {
  constructor(private readonly pgService: PgService) {}

  async getCurrencyByCode(code: string) {
    const currency = await this.pgService.kysley
      .selectFrom('currency')
      .selectAll()
      .where('code', '=', code)
      .executeTakeFirst();
    return currency ?? null;
  }
}
