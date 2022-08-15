import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DateController } from './date.controller';
import { DateService } from './date.service';

@Module({
  imports: [PrismaModule],
  controllers: [DateController],
  providers: [DateService],
})
export class DateModule {}
