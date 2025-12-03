import { Injectable } from '@nestjs/common';
import { BaseInspectionService } from './common/base-inspection.service';
import { PrismaService } from 'src/database/prisma.service';
import { SubstrateInspection } from '@aps/shared-types';
import { Prisma } from '@prisma/client';

@Injectable()
export class SubstrateInspectionService extends BaseInspectionService<SubstrateInspection> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  protected getDelegate(tx: Prisma.TransactionClient) {
    return tx.substrateInspection;
  }

  protected filterById(id: string) {
    return { substrateId: id };
  }
}
