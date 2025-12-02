import { Injectable } from '@nestjs/common';
import {
  BasePrismaService,
  PrismaDelegate,
} from 'src/common/services/base-prisma.service';
import {
  ReportTypeAssignment,
  CreateReportTypeAssignmentDto,
  UpdateReportTypeAssignmentDto,
  QueryReportTypeAssignmentDto,
} from '@aps/shared-types';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ReportTypeAssignmentService extends BasePrismaService<
  ReportTypeAssignment,
  CreateReportTypeAssignmentDto,
  UpdateReportTypeAssignmentDto
> {
  constructor(private prisma: PrismaService) {
    super(
      prisma.reportTypeAssignment as unknown as PrismaDelegate<
        ReportTypeAssignment,
        CreateReportTypeAssignmentDto,
        UpdateReportTypeAssignmentDto
      >,
      'ReportTypeAssignment',
    );
  }

  async findReportTypeAssignments(
    query: QueryReportTypeAssignmentDto,
  ): Promise<ReportTypeAssignment[]> {
    return this.prisma.reportTypeAssignment.findMany({
      where: query,
    });
  }
}
