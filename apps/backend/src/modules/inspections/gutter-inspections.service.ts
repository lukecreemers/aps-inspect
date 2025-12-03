import { Injectable } from '@nestjs/common';
import { BaseInspectionService } from './common/base-inspection.service';
import { PrismaService } from 'src/database/prisma.service';
import { GutterInspection } from '@aps/shared-types';
import { Prisma } from '@prisma/client';

@Injectable()
export class GutterInspectionService extends BaseInspectionService<GutterInspection> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  protected getDelegate(tx: Prisma.TransactionClient) {
    return tx.gutterInspection;
  }

  protected filterById(id: string) {
    return { gutterId: id };
  }
}
