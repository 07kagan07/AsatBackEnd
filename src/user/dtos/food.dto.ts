import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class foodsDto {
  @IsString()
  @IsNotEmpty()
  food: string;
  @IsNumber()
  calorie: number;
}

export class updateFoodDto {
  @IsNumber()
  newCalorie: number;
  @IsString()
  newFoodName: string;
}

export class getFoodDTO {
  @IsNumber()
  ids: number;
}
