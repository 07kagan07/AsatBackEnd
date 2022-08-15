import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface foodParam {
  food: string;
  calorie: number;
}

interface updateFoodParam {
  newCalorie: number;
  newFoodName: string;
}
interface getFoodParam {
  ids: number;
}

@Injectable()
export class FoodService {
  constructor(private readonly prismaService: PrismaService) {}

  getFoods() {
    return this.prismaService.foods.findMany();
  }

  getFood({ ids }: getFoodParam) {
    return this.prismaService.foods.findMany({ where: { id: ids } });
  }

  async addFood({ food, calorie }: foodParam) {
    const checkFood = await this.prismaService.foods.findFirst({
      where: { food },
    });

    if (checkFood) {
      throw new ConflictException();
    }

    const dbPush = this.prismaService.foods.create({ data: { food, calorie } });

    return dbPush;
  }

  updateFood(food: string, { newCalorie, newFoodName }: updateFoodParam) {
    const temp = this.prismaService.foods.update({
      where: { food },
      data: { food: newFoodName, calorie: newCalorie },
    });

    return temp;
  }
}
