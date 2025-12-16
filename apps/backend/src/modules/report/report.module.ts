import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { ReportCreatorService } from './report-creator.service';
import { PrismaModule } from 'src/database/prisma.module';
import { ReportStatusService } from './report-status.service';

@Module({
  imports: [PrismaModule],
  controllers: [ReportController],
  providers: [ReportService, ReportCreatorService, ReportStatusService],
})
export class ReportModule {}
