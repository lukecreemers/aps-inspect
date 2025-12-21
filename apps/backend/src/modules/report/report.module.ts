import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { ReportCreatorService } from './report-creator.service';
import { PrismaModule } from 'src/database/prisma.module';
import { ReportStatusService } from './report-status.service';
import { ReportViewerService } from './report-viewer.service';

@Module({
  imports: [PrismaModule],
  controllers: [ReportController],
  providers: [
    ReportService,
    ReportCreatorService,
    ReportStatusService,
    ReportViewerService,
  ],
})
export class ReportModule {}
