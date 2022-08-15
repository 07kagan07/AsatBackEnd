import { IsDate, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class dateCreateDto {
  @Type(() => Date)
  @IsDate()
  meal_date: Date;
  @IsString()
  meal_day: string;
}

export class getDateDto {
  @Type(() => Date)
  @IsDate()
  meal_date: Date;
}

export class deleteDateDto {
  @IsNumber()
  ids: number;
}
