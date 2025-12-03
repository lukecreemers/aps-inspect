import { Injectable } from '@nestjs/common';
import { ReportTypeHandler } from './report-type.handler';
import {
  ExteriorBundle,
  SubstrateView,
  Window,
  WindowView,
} from '@aps/shared-types';
import { Building, Prisma, ReportType, Substrate } from '@prisma/client';
import { IssueViewHandler } from './issue-view.handler';
import { WindowInspectionService } from 'src/modules/inspections/window-inspections.service';
import { SubstrateInspectionService } from 'src/modules/inspections/substrate-inspections.service';

@Injectable()
export class ExteriorReportHandler
  implements ReportTypeHandler<ExteriorBundle>
{
  constructor(
    private readonly issueViewHandler: IssueViewHandler,
    private readonly substrateInspectionService: SubstrateInspectionService,
    private readonly windowInspectionService: WindowInspectionService,
  ) {}
  type = ReportType.EXTERIOR;

  async createBundle(
    tx: Prisma.TransactionClient,
    building: Building,
  ): Promise<ExteriorBundle> {
    const substrates = await this.findSubstrates(tx, building);
    const substrateViews = await Promise.all(
      substrates.map((substrate) => this.mapSubstrate(tx, substrate)),
    );

    const windows = await this.findWindows(tx, building);
    const windowViews = await Promise.all(
      windows.map((window) => this.mapWindow(tx, window)),
    );

    const issueViews = await this.issueViewHandler.getIssueViews(
      tx,
      building,
      ReportType.EXTERIOR,
    );
    return {
      substrates: substrateViews,
      windows: windowViews,
      issues: issueViews,
    };
  }

  // =============================
  //           helpers
  // =============================
  private async findSubstrates(
    tx: Prisma.TransactionClient,
    building: Building,
  ): Promise<Substrate[]> {
    return tx.substrate.findMany({
      where: { buildingId: building.id },
    });
  }

  private async findWindows(
    tx: Prisma.TransactionClient,
    building: Building,
  ): Promise<Window[]> {
    return tx.window.findMany({
      where: { buildingId: building.id },
    });
  }

  private async mapSubstrate(
    tx: Prisma.TransactionClient,
    substrate: Substrate,
  ): Promise<SubstrateView> {
    const insp = await this.substrateInspectionService.getLatestInspection(
      tx,
      substrate.id,
    );

    if (!insp) {
      return this.defaultSubstrateView(substrate.id);
    }

    const type = await tx.substrateType.findUniqueOrThrow({
      where: { id: insp.typeId },
    });

    return {
      id: substrate.id,
      type,
      condition: insp.condition,
    };
  }

  private defaultSubstrateView(substrateId: string): SubstrateView {
    return {
      id: substrateId,
      type: null,
      condition: null,
    };
  }

  private async mapWindow(
    tx: Prisma.TransactionClient,
    window: Window,
  ): Promise<WindowView> {
    const insp = await this.windowInspectionService.getLatestInspection(
      tx,
      window.id,
    );

    if (!insp) {
      return this.defaultWindowView(window.id);
    }

    const type = await tx.windowType.findUniqueOrThrow({
      where: { id: insp.typeId },
    });

    return {
      id: window.id,
      type,
      condition: insp.condition,
    };
  }

  private defaultWindowView(windowId: string): WindowView {
    return {
      id: windowId,
      type: null,
      condition: null,
    };
  }
}
