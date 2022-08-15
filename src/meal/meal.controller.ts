import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { addMealDto, getMealDto } from 'src/user/dtos/meal.dto';
import { MealService } from './meal.service';

@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}
  @Get()
  getMeals() {
    return this.mealService.getMeals();
  }
  @Post('/find')
  getMeal(@Body() body: getMealDto) {
    return this.mealService.getMeal(body);
  }

  @Post('/add')
  addMeal(@Body() body: addMealDto) {
    return this.mealService.addMeal(body);
  }

  @Delete()
  deleteMeal(@Body() body: getMealDto) {
    return this.mealService.deleteMeal(body);
  }
}
