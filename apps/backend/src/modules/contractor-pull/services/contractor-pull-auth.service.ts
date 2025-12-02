import { ContractorPullDto } from '@aps/shared-types';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class ContractorPullAuthService {
  async validate(tx, reportWorkBlockId: string, body: ContractorPullDto) {
    const block = await tx.reportWorkBlock.findFirstOrThrow({
      where: { id: reportWorkBlockId },
    });

    if (block.loginSecretText !== body.loginSecretText) {
      throw new ForbiddenException('Invalid login secret');
    }

    return block;
  }
}
