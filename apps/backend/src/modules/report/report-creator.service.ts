import { CreateSystemReportDto, Report } from '@aps/shared-types';
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

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
}
