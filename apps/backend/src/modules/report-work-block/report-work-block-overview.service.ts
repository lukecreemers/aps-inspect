import {
  ReportTypeType,
  ReportWorkBlockOverviewResponse,
} from '@aps/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ReportWorkBlockOverviewService {
  constructor(private prisma: PrismaService) {}

  async getOverview(
    reportId: string,
  ): Promise<ReportWorkBlockOverviewResponse[]> {
    const workBlocks = await this.prisma.reportWorkBlock.findMany({
      where: {
        reportId,
      },
      include: {
        contractor: true,
        reportWorkUnits: true,
      },
    });

    return workBlocks.map((wb) => {
      const uniqueBuildings = new Set<string>(
        wb.reportWorkUnits.map((wu) => wu.reportBuildingId),
      );

      const types = new Set<ReportTypeType>(
        wb.reportWorkUnits.map((wu) => wu.type),
      );

      return {
        ...wb,
        buildingCount: uniqueBuildings.size,
        types: Array.from(types),
        contractorName: `${wb.contractor.firstName} ${wb.contractor.lastName}`,
      };
    });
  }
}
