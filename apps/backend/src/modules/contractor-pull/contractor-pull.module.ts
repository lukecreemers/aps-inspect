import { Module } from '@nestjs/common';
import { ContractorPullController } from './contractor-pull.controller';
import { ContractorPullService } from './contractor-pull.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  controllers: [ContractorPullController],
  providers: [ContractorPullService],
  imports: [PrismaModule],
})
export class ContractorPullModule {}
