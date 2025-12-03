import { ContractorPullDto } from '@aps/shared-types';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, ReportWorkBlock } from '@prisma/client';

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

    return block;
  }
}
