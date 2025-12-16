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
  ReportTypeStatusResponse,
} from '@aps/shared-types';
import { PrismaService } from 'src/database/prisma.service';
import { report } from 'node:process';

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

  async status(id: string): Promise<ReportTypeStatusResponse> {
    const reportType = await this.prisma.reportTypeAssignment.findFirstOrThrow({
      where: {
        id,
      },
    });

    const reportBuildings = await this.prisma.reportBuilding.findMany({
      where: {
        reportId: reportType.reportId,
      },
      include: {
        reportWorkUnits: {
          where: {
            type: reportType.type,
          },
        },
      },
    });

    let totalBuildings = reportBuildings.length;
    let totalCompleted = 0;
    let totalInProgress = 0;

    for (const rb of reportBuildings) {
      const workUnit = rb.reportWorkUnits[0];

      if (!workUnit) continue;

      if (workUnit.status === 'SUBMITTED') totalCompleted++;
      if (workUnit.status === 'IN_PROGRESS') totalInProgress++;
    }

    return {
      totalBuildings,
      totalCompleted,
      totalInProgress,
    };
  }
}
