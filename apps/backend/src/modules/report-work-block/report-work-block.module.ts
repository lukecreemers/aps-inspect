import { Module } from '@nestjs/common';
import { ReportWorkBlockController } from './report-work-block.controller';
import { ReportWorkBlockService } from './report-work-block.service';
import { PrismaModule } from 'src/database/prisma.module';
import { ReportWorkBlockOverviewService } from './report-work-block-overview.service';
import { ReportWorkBlockEmailService } from './report-work-block-email.service';
import { MailModule } from 'src/common/mail/mail.module';

@Module({
  imports: [PrismaModule, MailModule],
  controllers: [ReportWorkBlockController],
  providers: [
    ReportWorkBlockService,
    ReportWorkBlockOverviewService,
    ReportWorkBlockEmailService,
  ],
})
export class ReportWorkBlockModule {}
