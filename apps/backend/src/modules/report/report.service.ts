import {
  CreateStandardReportDto,
  CreateSystemReportDto,
  GetReportsQueryDto,
  Report,
  UpdateReportDto,
} from '@aps/shared-types';
import { Injectable } from '@nestjs/common';
import {
  BasePrismaService,
  PrismaDelegate,
} from 'src/common/services/base-prisma.service';
import { PrismaService } from 'src/database/prisma.service';
import { ReportCreatorService } from './report-creator.service';
import { CreateReportBuildingDto } from '@aps/shared-types/src/report-building';

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
    super(
      prisma.report as unknown as PrismaDelegate<
        Report,
        CreateSystemReportDto,
        UpdateReportDto
      >,
      'Report',
    );
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

  async createStandardReport(dto: CreateStandardReportDto): Promise<Report> {
    return this.prisma.$transaction(async (tx) => {
      return this.reportCreator.createStandardReport(tx, dto);
    });
  }
}
