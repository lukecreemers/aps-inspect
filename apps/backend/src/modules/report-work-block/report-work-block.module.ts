import { Module } from '@nestjs/common';
import { ReportWorkBlockController } from './report-work-block.controller';
import { ReportWorkBlockService } from './report-work-block.service';
import { PrismaModule } from 'src/database/prisma.module';
import { ReportWorkBlockOverviewService } from './report-work-block-overview.service';

@Module({
  imports: [PrismaModule],
  controllers: [ReportWorkBlockController],
  providers: [ReportWorkBlockService, ReportWorkBlockOverviewService],
})
export class ReportWorkBlockModule {}
