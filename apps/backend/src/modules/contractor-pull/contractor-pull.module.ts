import { Module } from '@nestjs/common';
import { ContractorPullController } from './contractor-pull.controller';

import { PrismaModule } from 'src/database/prisma.module';
import { ContractorPullService } from './services/contractor-pull.service';
import { ContractorPullAuthService } from './services/contractor-pull-auth.service';
import { ContractorPullFetchService } from './services/contractor-pull-fetch.service';
import { InspectionsModule } from '../inspections/inspections.module';
import { ReportTypeHandlerRegistry } from './services/handlers/report-type-handler-registry';
import { RoofReportHandler } from './services/handlers/roof-report.handler';

@Module({
  controllers: [ContractorPullController],
  providers: [
    ContractorPullService,
    ContractorPullAuthService,
    ContractorPullFetchService,
    ReportTypeHandlerRegistry,
    RoofReportHandler,
  ],
  imports: [PrismaModule, InspectionsModule],
})
export class ContractorPullModule {}
