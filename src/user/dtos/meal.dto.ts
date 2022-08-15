import { IsNumber } from 'class-validator';

export class addMealDto {
  @IsNumber()
  foodId: number;
  @IsNumber()
  meal_id: number;
}

export class getMealDto {
  @IsNumber()
  meal_id: number;
}
