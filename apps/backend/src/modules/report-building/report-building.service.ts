import { Injectable } from '@nestjs/common';
import { ReportBuilding } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { BasePrismaLightService } from 'src/common/services/base-prisma-light.service';
import { PrismaLightDelegate } from 'src/common/services/base-prisma-light.service';
import { CreateReportBuildingDto } from '@aps/shared-types/src/report-building/dto/create-report-building.dto';
import { GetReportBuildingsQueryDto } from '@aps/shared-types/src/report-building/dto/get-report-building-query.dto';
@Injectable()
export class ReportBuildingService extends BasePrismaLightService<
  ReportBuilding,
  CreateReportBuildingDto
> {
  constructor(private prisma: PrismaService) {
    super(
      prisma.reportBuilding as unknown as PrismaLightDelegate<
        ReportBuilding,
        CreateReportBuildingDto
      >,
      'ReportBuilding',
    );
  }

  async findReportBuildings(
    query: GetReportBuildingsQueryDto,
  ): Promise<ReportBuilding[]> {
    return this.prisma.reportBuilding.findMany({
      where: query,
    });
  }
}
