import { Module } from '@nestjs/common';
import { ReportWorkUnitController } from './report-work-unit.controller';
import { ReportWorkUnitService } from './report-work-unit.service';
import { PrismaModule } from 'src/database/prisma.module';

/**
 * The ReportWorkUnit module manages the work units associated with a report.
 * They have multiple statuses and are updated as the report progresses.
 * They are also associated with a report and a report building.
 */
@Module({
  imports: [PrismaModule],
  controllers: [ReportWorkUnitController],
  providers: [ReportWorkUnitService],
})
export class ReportWorkUnitModule {}
