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
import { Logger } from '@nestjs/common';
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

  async createBundle(
    tx: Prisma.TransactionClient,
    building: Building,
  ): Promise<RoofBundle> {
    const roofs = await this.findRoofs(tx, building);
    const roofViews = await Promise.all(
      roofs.map((roof) => this.mapRoof(tx, roof)),
    );
    return { roofs: roofViews };
  }

  // =============================
  //           helpers
  // =============================

  private async findRoofs(
    tx: Prisma.TransactionClient,
    building: Building,
  ): Promise<Roof[]> {
    return tx.roof.findMany({
      where: { buildingId: building.id },
    });
  }

  private async mapRoof(
    tx: Prisma.TransactionClient,
    roof: Roof,
  ): Promise<RoofView> {
    const insp = await this.roofInspectionService.getLatestInspection(roof.id);

    if (!insp) {
      return this.defaultRoofView(roof.id);
    }

    const type = await tx.roofType.findUniqueOrThrow({
      where: { id: insp.typeId },
    });

    return {
      id: roof.id,
      area: insp.area,
      type,
      condition: insp.condition,
      paintCondition: insp.paintCondition,
      paintColor: insp.color,
    };
  }

  private defaultRoofView(roofId: string): RoofView {
    return {
      id: roofId,
      area: null,
      type: null,
      condition: null,
      paintCondition: null,
      paintColor: null,
    };
  }
}
