import { Injectable } from '@nestjs/common';
import { BaseInspectionService } from './common/base-inspection.service';
import { PrismaService } from 'src/database/prisma.service';
import { SubIssueInspection } from '@aps/shared-types';

@Injectable()
export class SubIssueInspectionService extends BaseInspectionService<SubIssueInspection> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  protected readonly delegate = this.prisma.subIssueInspection;

  protected filterById(id: string) {
    return { subIssueId: id };
  }
}
