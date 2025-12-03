import { Injectable } from '@nestjs/common';
import { BaseInspectionService } from './common/base-inspection.service';
import { PrismaService } from 'src/database/prisma.service';
import { RoofInspection } from '@aps/shared-types';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoofInspectionService extends BaseInspectionService<RoofInspection> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  protected getDelegate(tx: Prisma.TransactionClient) {
    return tx.roofInspection;
  }

  protected filterById(id: string) {
    return { roofId: id };
  }
}
