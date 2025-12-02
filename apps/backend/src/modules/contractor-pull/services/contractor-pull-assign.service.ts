import { ReportWorkBlock, ReportWorkUnit } from '@aps/shared-types';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContractorPullAssignService {
  async assign(
    tx: Prisma.TransactionClient,
    workUnits: ReportWorkUnit[],
    workBlock: ReportWorkBlock[],
  ) {}
}
