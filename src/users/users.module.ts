import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DataModule } from 'src/data/data.module';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  imports: [DataModule],
  providers: [UsersService],
})
export class UsersModule {}
