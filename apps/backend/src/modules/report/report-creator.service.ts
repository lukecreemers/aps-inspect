import {
  CreateStandardReportDto,
  CreateSystemReportDto,
  Report,
} from '@aps/shared-types';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReportCreatorService {
  async createSystemReport(
    tx: Prisma.TransactionClient,
    data: CreateSystemReportDto,
  ): Promise<Report> {
    const report = await tx.report.create({
      data: {
        ...data,
        title: 'system:' + new Date().toISOString(),
        isSystem: true,
      },
    });

    // Future add extra data here.
    return report;
  }

  async createStandardReport(
    tx: Prisma.TransactionClient,
    data: CreateStandardReportDto,
  ): Promise<Report> {
    // Create report
    const report = await tx.report.create({
      data: {
        clientId: data.clientId,
        title: data.title,
        isSystem: false,
      },
    });

    await tx.reportTypeAssignment.createMany({
      data: data.reportNameTypes.map((type) => ({
        reportId: report.id,
        type: type.type,
        title: type.title,
      })),
    });

    await tx.reportBuilding.createMany({
      data: data.buildingIds.map((buildingId) => ({
        reportId: report.id,
        buildingId,
      })),
    });

    const reportBuildings = await tx.reportBuilding.findMany({
      where: { reportId: report.id },
      select: { id: true, buildingId: true },
    });

    await tx.reportWorkUnit.createMany({
      data: reportBuildings.flatMap((rb) =>
        data.reportNameTypes.map((type) => ({
          reportBuildingId: rb.id,
          type: type.type,
          status: 'PENDING',
        })),
      ),
    });

    return report;
  }
}
