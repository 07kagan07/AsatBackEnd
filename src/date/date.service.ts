import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface createDateParam {
  meal_date: Date;
  meal_day: string;
}
interface getDateParam {
  meal_date: Date;
}

interface deleteDateParam {
  ids: number;
}
@Injectable()
export class DateService {
  constructor(private readonly prismaService: PrismaService) {}

  async addDate({ meal_date, meal_day }: createDateParam) {
    const IsHere = await this.prismaService.home.findUnique({
      where: { meal_date: meal_date },
    });

    if (IsHere) {
      throw new ConflictException();
    }

    const dbPush = await this.prismaService.home.create({
      data: {
        meal_date,
        meal_day,
      },
    });

    return dbPush;
  }

  getDate({ meal_date }: getDateParam) {
    const date = this.prismaService.home.findUnique({
      where: { meal_date },
    });
    return date;
  }

  getAllDate() {
    return this.prismaService.home.findMany();
  }

  deleteDateMeal({ ids }: deleteDateParam) {
    console.log(ids);

    this.prismaService.meal.deleteMany({
      where: { meal_id: ids },
    });
    return;
  }

  deleteDate({ ids }: deleteDateParam) {
    return this.prismaService.home.delete({ where: { id: ids } });
  }
}
