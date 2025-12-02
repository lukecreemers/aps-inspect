import { Injectable } from '@nestjs/common';
import { BaseInspectionService } from './common/base-inspection.service';
import { PrismaService } from 'src/database/prisma.service';
import { IssueInspection } from '@aps/shared-types';

@Injectable()
export class IssueInspectionService extends BaseInspectionService<IssueInspection> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  protected readonly delegate = this.prisma.issueInspection;

  protected filterById(id: string) {
    return { issueId: id };
  }
}
