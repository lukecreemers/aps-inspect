import {
  ContractorResponseSchema,
  ReportViewerOutput,
  ViewerBuilding,
  ViewerLocation,
  ViewerLocationSchema,
  ViewerWorkUnit,
  ViewerWorkUnitSchema,
} from '@aps/shared-types';
import { Injectable } from '@nestjs/common';
import { Building } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ReportViewerService {
  constructor(private prisma: PrismaService) {}

  async getReportView(reportId: string): Promise<ReportViewerOutput> {
    const report = await this.prisma.report.findFirstOrThrow({
      where: { id: reportId },
      include: {
        buildings: true,
      },
    });

    const buildingViews: ViewerBuilding[] = await Promise.all(
      report.buildings.map(async (rb) => {
        return this.getBuildingView(rb.buildingId, rb.id);
      }),
    );

    const locationIds: string[] = [
      ...new Set(
        buildingViews
          .map((bv) => bv.locationId)
          .filter((id): id is string => id !== null),
      ),
    ];

    const locations = await this.prisma.location.findMany({
      where: { id: { in: locationIds } },
    });

    const locationMap = new Map<string, ViewerBuilding[]>();
    const unattachedBuildings: ViewerBuilding[] = [];

    buildingViews.forEach((bv) => {
      if (bv.locationId) {
        const locationId = bv.locationId;
        if (!locationMap.has(locationId)) {
          locationMap.set(locationId, []);
        }
        locationMap.get(locationId)!.push(bv);
      } else {
        unattachedBuildings.push(bv);
      }
    });

    const locationViews: ViewerLocation[] = Array.from(
      locationMap.entries(),
    ).map(([locationId, buildings]) => {
      const location = locations.find((l) => l.id === locationId)!;
      return {
        ...location,
        buildings,
      };
    });

    return {
      ...report,
      locations: locationViews,
      unattachedBuildings,
    };
  }

  private async getBuildingView(
    buildingId: string,
    reportBuildingId: string,
  ): Promise<ViewerBuilding> {
    const workUnits = await this.prisma.reportWorkUnit.findMany({
      where: {
        reportBuildingId: reportBuildingId,
      },
      include: {
        contractor: true,
        issueInspections: true,
      },
    });

    const workUnitViews: ViewerWorkUnit[] = workUnits.map((wu) => {
      const { contractor, issueInspections, ...workUnitData } = wu;
      return {
        ...workUnitData,
        contractor: contractor
          ? ContractorResponseSchema.parse(contractor)
          : undefined,
        issueCount: issueInspections.length,
      };
    });

    const building = await this.prisma.building.findFirstOrThrow({
      where: {
        id: buildingId,
      },
    });
    return {
      ...building,
      workUnits: workUnitViews,
    };
  }
}
