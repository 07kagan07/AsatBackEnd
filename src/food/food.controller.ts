import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { foodsDto, getFoodDTO, updateFoodDto } from 'src/user/dtos/food.dto';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  getFoods() {
    return this.foodService.getFoods();
  }
  @Post('/find')
  getMeal(@Body() body: getFoodDTO) {
    return this.foodService.getFood(body);
  }

  @Post('/add')
  addFood(@Body() body: foodsDto) {
    return this.foodService.addFood(body);
  }

  @Put(':id')
  updateFood(@Body() body: updateFoodDto, @Param('id') food: string) {
    return this.foodService.updateFood(food, body);
  }
  @Delete(':foodName')
  deleteFood() {
    return;
  }
}
