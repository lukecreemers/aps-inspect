import { ContractorPullDto } from '@aps/shared-types';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import {
  Prisma,
  ReportWorkBlock,
  WorkBlockStatus,
  WorkUnitStatus,
} from '@prisma/client';

@Injectable()
export class ContractorPullAuthService {
  async validate(
    tx: Prisma.TransactionClient,
    reportWorkBlockId: string,
    body: ContractorPullDto,
  ): Promise<ReportWorkBlock> {
    const block = await tx.reportWorkBlock.findFirstOrThrow({
      where: { id: reportWorkBlockId },
    });

    if (block.loginSecretText !== body.loginSecretText) {
      throw new ForbiddenException('Invalid login secret');
    }

    if (block.status !== WorkBlockStatus.ASSIGNED) {
      throw new BadRequestException(
        `Block is currently ${block.status}. Expected ${WorkBlockStatus.ASSIGNED}.`,
      );
    }
    await this.validateWorkUnits(tx, reportWorkBlockId);

    return block;
  }

  async validateWorkUnits(
    tx: Prisma.TransactionClient,
    reportWorkBlockId: string,
  ) {
    const workUnits = await tx.reportWorkUnit.findMany({
      where: { reportWorkBlockId },
    });

    if (workUnits.length === 0) {
      throw new BadRequestException('No work units found');
    }

    for (const workUnit of workUnits) {
      if (workUnit.status !== WorkUnitStatus.PENDING) {
        throw new BadRequestException(
          `Work unit ${workUnit.id} is currently ${workUnit.status}. Expected ${WorkUnitStatus.PENDING}.`,
        );
      }
    }
  }
}
