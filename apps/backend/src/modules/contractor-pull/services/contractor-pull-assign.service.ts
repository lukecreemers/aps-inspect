import { ReportWorkBlock, ReportWorkUnit } from '@aps/shared-types';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContractorPullAssignService {
  async assign(
    tx: Prisma.TransactionClient,
    workUnits: ReportWorkUnit[],
    workBlock: ReportWorkBlock,
  ) {
    const contractor = await tx.contractor.findUniqueOrThrow({
      where: { id: workBlock.contractorId },
    });

    await tx.reportWorkBlock.update({
      where: { id: workBlock.id },
      data: {
        status: 'IN_PROGRESS',
      },
    });

    await tx.reportWorkUnit.updateMany({
      where: { id: { in: workUnits.map((wu) => wu.id) } },
      data: {
        status: 'IN_PROGRESS',
      },
    });
  }
}
