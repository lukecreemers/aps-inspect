import { Injectable } from '@nestjs/common';
import { BaseInspectionService } from './common/base-inspection.service';
import { PrismaService } from 'src/database/prisma.service';
import { SubIssueInspection } from '@aps/shared-types';
import { Prisma } from '@prisma/client';

@Injectable()
export class SubIssueInspectionService extends BaseInspectionService<SubIssueInspection> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  protected getDelegate(tx: Prisma.TransactionClient) {
    return tx.subIssueInspection;
  }

  protected filterById(id: string) {
    return { subIssueId: id };
  }
}
