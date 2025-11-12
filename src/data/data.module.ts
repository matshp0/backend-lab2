import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/users.repository';

@Module({
  providers: [UserRepository],
  exports: [UserRepository],
})
export class DataModule {}
