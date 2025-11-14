import { IsOptional, IsString } from 'class-validator';

export class GetAllRecordsFilter {
  @IsOptional()
  @IsString()
  category_id?: string;

  @IsOptional()
  @IsString()
  user_id?: string;
}
