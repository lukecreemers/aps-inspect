import { Injectable } from '@nestjs/common';
import { BaseInspectionService } from './common/base-inspection.service';
import { PrismaService } from 'src/database/prisma.service';
import { WindowInspection } from '@aps/shared-types';
import { Prisma } from '@prisma/client';

@Injectable()
export class WindowInspectionService extends BaseInspectionService<WindowInspection> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  protected getDelegate(tx: Prisma.TransactionClient) {
    return tx.windowInspection;
  }

  protected filterById(id: string) {
    return { windowId: id };
  }
}
