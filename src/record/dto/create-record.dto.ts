import {
  IsString,
  IsNotEmpty,
  IsDecimal,
  IsUUID,
  IsOptional,
} from 'class-validator';

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

  @IsString()
  @IsOptional()
  currencyCode?: string;
}
