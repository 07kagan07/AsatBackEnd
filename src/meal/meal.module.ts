import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';

@Module({
  imports: [PrismaModule],
  controllers: [MealController],
  providers: [MealService],
})
export class MealModule {}
