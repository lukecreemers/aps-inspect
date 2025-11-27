import { Module } from '@nestjs/common';
import { ReportBuildingController } from './report-building.controller';
import { ReportBuildingService } from './report-building.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReportBuildingController],
  providers: [ReportBuildingService],
})
export class ReportBuildingModule {}
