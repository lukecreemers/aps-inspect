import {
  CreateReportWorkUnitDto,
  GetReportWorkUnitsQueryDto,
  ReportWorkUnit,
  UpdateReportWorkUnitDto,
} from '@aps/shared-types';
import { Injectable } from '@nestjs/common';
import {
  BasePrismaService,
  PrismaDelegate,
} from 'src/common/services/base-prisma.service';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ReportWorkUnitService extends BasePrismaService<
  ReportWorkUnit,
  CreateReportWorkUnitDto,
  UpdateReportWorkUnitDto
> {
  constructor(private prisma: PrismaService) {
    super(
      prisma.reportWorkUnit as unknown as PrismaDelegate<
        ReportWorkUnit,
        CreateReportWorkUnitDto,
        UpdateReportWorkUnitDto
      >,
      'ReportWorkUnit',
    );
  }

  async findReportWorkUnits(
    query: GetReportWorkUnitsQueryDto,
  ): Promise<ReportWorkUnit[]> {
    return this.prisma.reportWorkUnit.findMany({
      where: query,
    });
  }
}
