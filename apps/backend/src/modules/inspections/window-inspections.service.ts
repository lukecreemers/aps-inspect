import { Injectable } from '@nestjs/common';
import { BaseInspectionService } from './common/base-inspection.service';
import { PrismaService } from 'src/database/prisma.service';
import { WindowInspection } from '@aps/shared-types';

@Injectable()
export class WindowInspectionService extends BaseInspectionService<WindowInspection> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  protected readonly delegate = this.prisma.windowInspection;

  protected filterById(id: string) {
    return { windowId: id };
  }
}
