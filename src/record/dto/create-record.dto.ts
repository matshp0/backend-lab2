import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRecordDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  category_id: string;

  @IsNumber()
  @IsNotEmpty()
  cost: number;
}
