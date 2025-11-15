import { IsOptional, IsString } from 'class-validator';

export class GetAllRecordsFilter {
  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
