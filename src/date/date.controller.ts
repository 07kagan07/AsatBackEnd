import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  dateCreateDto,
  getDateDto,
  deleteDateDto,
} from 'src/user/dtos/date.dto';
import { DateService } from './date.service';

@Controller('date')
export class DateController {
  constructor(private readonly dateService: DateService) {}

  @Post('/add')
  addDate(@Body() body: dateCreateDto) {
    return this.dateService.addDate(body);
  }

  @Post('/find')
  getDate(@Body() meal_date: getDateDto) {
    //console.log(body);

    return this.dateService.getDate(meal_date);
  }

  @Get()
  getAllDate() {
    return this.dateService.getAllDate();
  }

  @Delete('/:ids')
  deleteDate(@Param('ids') body: deleteDateDto) {
    this.dateService.deleteDate(body);

    return 'Başarılısın';
  }
}
