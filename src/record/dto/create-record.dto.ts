import { IsString, IsNotEmpty, IsDecimal, IsUUID } from 'class-validator';

export class CreateRecordDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  @IsDecimal()
  cost: string;
}
