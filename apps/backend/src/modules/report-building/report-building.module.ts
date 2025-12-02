import { Module } from '@nestjs/common';
import { ReportBuildingController } from './report-building.controller';
import { ReportBuildingService } from './report-building.service';
import { PrismaModule } from 'src/database/prisma.module';

/**
 * The ReportBuilding module manages live building entities
 * that are associated with active reports. These records
 * exist only during the lifecycle of an active report and
 * are deleted upon report completion. Buildings can be removed
 * and added during the report lifecycle. These also tie directly
 * to work units with cascading deletion. (to prevent orphaned work units)
 */
@Module({
  imports: [PrismaModule],
  controllers: [ReportBuildingController],
  providers: [ReportBuildingService],
})
export class ReportBuildingModule {}
