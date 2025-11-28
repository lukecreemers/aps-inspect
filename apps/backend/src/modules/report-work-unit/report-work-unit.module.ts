import { Module } from '@nestjs/common';
import { ReportWorkUnitController } from './report-work-unit.controller';
import { ReportWorkUnitService } from './report-work-unit.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReportWorkUnitController],
  providers: [ReportWorkUnitService],
})
export class ReportWorkUnitModule {}
