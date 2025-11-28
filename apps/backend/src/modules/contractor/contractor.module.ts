import { Module } from '@nestjs/common';
import { ContractorService } from './contractor.service';
import { ContractorController } from './contractor.controller';

@Module({
  providers: [ContractorService],
  controllers: [ContractorController]
})
export class ContractorModule {}
