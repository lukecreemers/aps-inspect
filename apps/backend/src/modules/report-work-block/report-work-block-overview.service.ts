import {
  BuildingResponseSchema,
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

    return await Promise.all(
      workBlocks.map(async (wb) => {
        // Group work units by building ID to collect types per building
        const buildingTypesMap = new Map<string, Set<ReportTypeType>>();
        const uniqueBuildings = new Set<string>();
        const allTypes = new Set<ReportTypeType>();

        wb.reportWorkUnits.forEach((wu) => {
          uniqueBuildings.add(wu.reportBuildingId);
          allTypes.add(wu.type);

          if (!buildingTypesMap.has(wu.reportBuildingId)) {
            buildingTypesMap.set(wu.reportBuildingId, new Set());
          }
          buildingTypesMap.get(wu.reportBuildingId)!.add(wu.type);
        });

        const reportBuildings = await this.prisma.reportBuilding.findMany({
          where: {
            id: { in: Array.from(uniqueBuildings) },
          },
          include: {
            building: true,
          },
        });

        const buildingResponses = reportBuildings.map((rb) => {
          const buildingResponse = BuildingResponseSchema.parse(rb.building);
          const types = Array.from(
            buildingTypesMap.get(rb.id) || new Set<ReportTypeType>(),
          );
          return {
            ...buildingResponse,
            types,
          };
        });

        return {
          ...wb,
          buildingCount: uniqueBuildings.size,
          types: Array.from(allTypes),
          contractorName: `${wb.contractor.firstName} ${wb.contractor.lastName}`,
          buildings: buildingResponses,
        };
      }),
    );
  }
}
