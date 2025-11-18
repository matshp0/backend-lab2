import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../users/entities/user.entity';
import { PgService } from '../pg.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly pgService: PgService) {}

  async getUserById(id: string): Promise<UserEntity | null> {
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

  async createUser(user: CreateUserDto) {
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
