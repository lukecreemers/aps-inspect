import { Injectable } from '@nestjs/common';
import { BaseInspectionService } from './common/base-inspection.service';
import { PrismaService } from 'src/database/prisma.service';
import { RoofInspection } from '@aps/shared-types';

@Injectable()
export class RoofInspectionService extends BaseInspectionService<RoofInspection> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  protected readonly delegate = this.prisma.roofInspection;

  protected filterById(id: string) {
    return { roofId: id };
  }
}
