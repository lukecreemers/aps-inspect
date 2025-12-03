import { Injectable } from '@nestjs/common';
import { ReportTypeHandler } from './report-type.handler';
import { Gutter, Prisma, ReportType } from '@prisma/client';
import {
  Building,
  GutterView,
  Roof,
  RoofBundle,
  RoofView,
} from '@aps/shared-types';
import { RoofInspectionService } from 'src/modules/inspections/roof-inspections.service';
import { GutterInspectionService } from 'src/modules/inspections/gutter-inspections.service';

@Injectable()
export class RoofReportHandler implements ReportTypeHandler<RoofBundle> {
  constructor(
    private readonly roofInspectionService: RoofInspectionService,
    private readonly gutterInspectionService: GutterInspectionService,
  ) {}
  type = ReportType.ROOF;

  async createBundle(
    tx: Prisma.TransactionClient,
    building: Building,
  ): Promise<RoofBundle> {
    const roofs = await this.findRoofs(tx, building);
    const roofViews = await Promise.all(
      roofs.map((roof) => this.mapRoof(tx, roof)),
    );

    const gutters = await this.findGutters(tx, building);
    const gutterViews = await Promise.all(
      gutters.map((gutter) => this.mapGutter(tx, gutter)),
    );

    return { roofs: roofViews, gutters: gutterViews };
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
    const insp = await this.roofInspectionService.getLatestInspection(
      tx,
      roof.id,
    );

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

  private async findGutters(
    tx: Prisma.TransactionClient,
    building: Building,
  ): Promise<Gutter[]> {
    return tx.gutter.findMany({
      where: { buildingId: building.id },
    });
  }

  private async mapGutter(
    tx: Prisma.TransactionClient,
    gutter: Gutter,
  ): Promise<GutterView> {
    const insp = await this.gutterInspectionService.getLatestInspection(
      tx,
      gutter.id,
    );

    if (!insp) {
      return this.defaultGutterView(gutter.id);
    }

    const type = await tx.gutterType.findUniqueOrThrow({
      where: { id: insp.typeId },
    });

    return {
      id: gutter.id,
      length: insp.length,
      type,
      condition: insp.condition,
    };
  }

  private defaultGutterView(gutterId: string): GutterView {
    return {
      id: gutterId,
      type: null,
      condition: null,
      length: null,
    };
  }
}
