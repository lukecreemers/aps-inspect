import { Injectable } from '@nestjs/common';
import { BaseInspectionService } from './common/base-inspection.service';
import { PrismaService } from 'src/database/prisma.service';
import { SubstrateInspection } from '@aps/shared-types';

@Injectable()
export class SubstrateInspectionService extends BaseInspectionService<SubstrateInspection> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  protected readonly delegate = this.prisma.substrateInspection;

  protected filterById(id: string) {
    return { substrateId: id };
  }
}
