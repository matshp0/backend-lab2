import { Injectable } from '@nestjs/common';
import { PgService } from '../pg.service';
import { Insertable } from 'kysely';
import { user } from 'src/db/types';

@Injectable()
export class UserRepository {
  constructor(private readonly pgService: PgService) {}

  async getUserById(id: string) {
    const user = await this.pgService.kysley
      .selectFrom('user')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();
    return user || null;
  }

  async deleteUserById(id: string): Promise<boolean> {
    const deleted = await this.pgService.kysley
      .deleteFrom('user')
      .where('id', '=', id)
      .executeTakeFirst();
    return !!deleted.numDeletedRows;
  }

  async createUser(user: Insertable<user>) {
    return await this.pgService.kysley
      .insertInto('user')
      .values(user)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async getAll() {
    return await this.pgService.kysley.selectFrom('user').selectAll().execute();
  }
}
