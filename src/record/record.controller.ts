import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordEntity } from './entities/record.entity';
import { GetAllRecordsFilter } from './dto/get-all-records-filter.dto';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  create(@Body() createRecordDto: CreateRecordDto): RecordEntity {
    return this.recordService.create(createRecordDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): RecordEntity {
    return this.recordService.findOne(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.recordService.remove(id);
  }

  @Get()
  getAll(@Query() filters: GetAllRecordsFilter): RecordEntity[] {
    return this.recordService.findAll(filters);
  }
}
