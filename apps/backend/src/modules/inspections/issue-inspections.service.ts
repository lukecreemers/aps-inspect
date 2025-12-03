import { Injectable } from '@nestjs/common';
import { BaseInspectionService } from './common/base-inspection.service';
import { PrismaService } from 'src/database/prisma.service';
import { IssueInspection } from '@aps/shared-types';
import { Prisma } from '@prisma/client';

@Injectable()
export class IssueInspectionService extends BaseInspectionService<IssueInspection> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  protected getDelegate(tx: Prisma.TransactionClient) {
    return tx.issueInspection;
  }

  protected filterById(id: string) {
    return { issueId: id };
  }
}
