import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

import { MealModule } from './meal/meal.module';
import { FoodModule } from './food/food.module';
import { DateModule } from './date/date.module';

@Module({
  imports: [UserModule, PrismaModule, MealModule, FoodModule, DateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
