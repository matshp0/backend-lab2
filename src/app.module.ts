import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configSchema from './config/config.schema';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema: configSchema,
    }),
  ],
})
export class AppModule {}
