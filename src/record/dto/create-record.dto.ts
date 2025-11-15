import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRecordDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsNumber()
  @IsNotEmpty()
  cost: number;
}
