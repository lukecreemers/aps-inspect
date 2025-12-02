import { Injectable } from '@nestjs/common';
import { BaseInspectionService } from './common/base-inspection.service';
import { PrismaService } from 'src/database/prisma.service';
import { GutterInspection } from '@aps/shared-types';

@Injectable()
export class GutterInspectionService extends BaseInspectionService<GutterInspection> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  protected readonly delegate = this.prisma.gutterInspection;

  protected filterById(id: string) {
    return { gutterId: id };
  }
}
