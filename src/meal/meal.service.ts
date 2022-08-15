import { Injectable } from '@nestjs/common'; //ConflictException
import { PrismaService } from 'src/prisma/prisma.service';

interface addMealParams {
  foodId: number;
  meal_id: number;
}

interface getMealParams {
  meal_id: number;
}

@Injectable()
export class MealService {
  constructor(private readonly prismaService: PrismaService) {}

  getMeals() {
    const data = this.prismaService.home.findMany({
      orderBy: { meal_date: 'asc' },
      where: { meal_date: { gte: new Date() } }, //lte: new Date() ---->smallest  | gte: new Date() ----->biggest
      include: {
        meal: {
          select: { foodRelation: { select: { food: true, calorie: true } } },
        },
      },
    });
    console.log(Date());
    return data;
  }

  getMeal({ meal_id }: getMealParams) {
    return this.prismaService.meal.findMany({
      where: { meal_id: meal_id },
    });
  }

  async addMeal({ foodId, meal_id }: addMealParams) {
    const pbPush = await this.prismaService.meal.createMany({
      data: { foodId, meal_id },
    });
    return pbPush;
  }

  deleteMeal({ meal_id }: getMealParams) {
    return this.prismaService.meal.deleteMany({ where: { meal_id: meal_id } });
  }
}
