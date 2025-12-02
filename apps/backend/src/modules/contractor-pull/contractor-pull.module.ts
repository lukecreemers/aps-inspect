import { Module } from '@nestjs/common';
import { ContractorPullController } from './contractor-pull.controller';
import { ContractorPullService } from './services/contractor-pull.service';
import { PrismaModule } from 'src/database/prisma.module';
import { ContractorPullAuthService } from './services/contractor-pull-auth.service';
import { ContractorPullAssembleService } from './services/contractor-pull-assemble.service';
import { ContractorPullFetchService } from './services/contractor-pull-fetch.service';
import { ContractorPullAssignService } from './services/contractor-pull-assign.service';

@Module({
  controllers: [ContractorPullController],
  providers: [
    ContractorPullService,
    ContractorPullAuthService,
    ContractorPullFetchService,
    ContractorPullAssembleService,
    ContractorPullAssignService,
  ],
  imports: [PrismaModule],
})
export class ContractorPullModule {}
