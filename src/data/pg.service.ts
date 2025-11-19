import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { DB } from 'src/db/types';

@Injectable()
export class PgService implements OnModuleDestroy {
  public readonly kysley: Kysely<DB>;

  constructor(private readonly configService: ConfigService) {
    const dbConfig = this.configService.getOrThrow<string>('dbUrl');
    const dialect = new PostgresDialect({
      pool: new Pool({
        connectionString: dbConfig,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    });
    this.kysley = new Kysely<DB>({ dialect });
  }

  onModuleDestroy() {
    return this.kysley.destroy();
  }
}
