import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { RecordModule } from './record/record.module';
import configSchema from './config/config.schema';
import config from './config/config';
import { DataModule } from './data/data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema: configSchema,
    }),
    UsersModule,
    CategoryModule,
    RecordModule,
  ],
  providers: [DataModule],
})
export class AppModule {}
