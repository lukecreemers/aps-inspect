import {
  BuildingResponseSchema,
  ReportStatusBuildingView,
  ReportStatusLocationView,
  ReportStatusResponse,
} from '@aps/shared-types';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReportStatusService {
  async getReportStatus(
    id: string,
    tx: Prisma.TransactionClient,
  ): Promise<ReportStatusResponse> {
    // Get report Buildings,
    const reportBuildings = await tx.reportBuilding.findMany({
      where: {
        reportId: id,
      },
      include: {
        reportWorkUnits: true,
        building: true,
      },
    });

    const buildingViews: ReportStatusBuildingView[] = reportBuildings.map(
      (rb) => ({
        building: rb.building,
        types: rb.reportWorkUnits.map((rwu) => ({
          type: rwu.type,
          status: rwu.status,
          workUnitId: rwu.id,
        })),
      }),
    );

    const locationIds: string[] = [
      ...new Set(
        buildingViews
          .map((bv) => bv.building.locationId)
          .filter((id): id is string => id !== null),
      ),
    ];

    const locations = await tx.location.findMany({
      where: { id: { in: locationIds } },
    });

    const locationMap = new Map<string, ReportStatusBuildingView[]>();
    const unattachedBuildings: ReportStatusBuildingView[] = [];

    for (const bv of buildingViews) {
      if (bv.building.locationId) {
        const locationId = bv.building.locationId;
        if (!locationMap.has(locationId)) {
          locationMap.set(locationId, []);
        }
        locationMap.get(locationId)!.push(bv);
      } else {
        unattachedBuildings.push(bv);
      }
    }

    const locationViews: ReportStatusLocationView[] = Array.from(
      locationMap.entries(),
    ).map(([locationId, buildings]) => {
      const location = locations.find((l) => l.id === locationId)!;
      return {
        location: location,
        buildings,
      };
    });

    return {
      locations: locationViews,
      unattachedBuildings,
    };
  }
}
