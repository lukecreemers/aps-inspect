import { Injectable } from '@nestjs/common';
import { ReportTypeHandler } from './report-type.handler';
import { groupBy } from 'rxjs';
import { Prisma, ReportType } from '@prisma/client';
import {
  Building,
  Roof,
  RoofBundle,
  RoofInspection,
  RoofType,
  RoofView,
} from '@aps/shared-types';
import { RoofInspectionService } from 'src/modules/inspections/roof-inspections.service';

type RoofRaw = {
  roofs: {
    id: string;
    type: RoofType | null;
    roofInspection: RoofInspection | null;
  }[];
};

@Injectable()
export class RoofReportHandler implements ReportTypeHandler {
  constructor(private readonly roofInspectionService: RoofInspectionService) {}
  type = ReportType.ROOF;

  async loadOne(
    tx: Prisma.TransactionClient,
    building: Building,
  ): Promise<RoofRaw> {
    const roofs = await tx.roof.findMany({
      where: { buildingId: building.id },
    });

    const enriched = await Promise.all(
      roofs.map(async (roof) => {
        const roofInspection =
          await this.roofInspectionService.getLatestInspection(roof.id);

        let type: RoofType | null = null;

        if (roofInspection?.typeId) {
          type = await tx.roofType.findUnique({
            where: { id: roofInspection.typeId },
          });
        }

        return {
          id: roof.id,
          roofInspection,
          type,
        };
      }),
    );

    return { roofs: enriched };
  }

  async mapOne(raw: RoofRaw): Promise<RoofBundle> {
    return {
      roofs: raw.roofs.map((r) => {
        const insp = r.roofInspection ?? {
          area: null,
          condition: 0,
          paintCondition: null,
          color: null,
        };

        return {
          id: r.id,
          area: insp.area,
          type: r.type,
          condition: insp.condition,
          paintCondition: insp.paintCondition,
          paintColor: insp.color,
        };
      }),
    };
  }
}
