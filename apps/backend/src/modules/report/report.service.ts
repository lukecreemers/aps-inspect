import {
  CreateSystemReportDto,
  GetReportsQueryDto,
  Report,
  UpdateReportDto,
} from '@aps/shared-types';
import { Injectable } from '@nestjs/common';
import { BasePrismaService } from 'src/common/services/base-prisma.service';
import { PrismaService } from 'src/database/prisma.service';
import { ReportCreatorService } from './report-creator.service';

@Injectable()
export class ReportService extends BasePrismaService<
  Report,
  CreateSystemReportDto,
  UpdateReportDto
> {
  constructor(
    private prisma: PrismaService,
    private reportCreator: ReportCreatorService,
  ) {
    super(prisma.report as any, 'Report');
  }

  async findReports(query: GetReportsQueryDto) {
    return this.prisma.report.findMany({
      where: {
        isSystem:
          query.type === 'system'
            ? true
            : query.type === 'standard'
              ? false
              : undefined,
        status: query.status,
        clientId: query.clientId,
      },
      take: query.take,
      skip: query.skip,
      orderBy: { createdAt: 'desc' },
    });
  }

  async createSystemReport(dto: CreateSystemReportDto) {
    return this.prisma.$transaction(async (tx) => {
      return this.reportCreator.createSystemReport(tx, dto);
    });
  }

  // async createStandardReport(data: CreateReportDto): Promise<Report> {
  // }
}
