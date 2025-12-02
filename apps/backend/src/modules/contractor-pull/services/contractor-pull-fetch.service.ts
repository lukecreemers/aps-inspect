import { Location, Window } from '@aps/shared-types';
import { Injectable } from '@nestjs/common';
import {
  Building,
  Gutter,
  Prisma,
  ReportWorkUnit,
  Roof,
  Substrate,
} from '@prisma/client';

@Injectable()
export class ContractorPullFetchService {
  async workUnits(tx: Prisma.TransactionClient, reportWorkBlockId: string) {
    return tx.reportWorkUnit.findMany({ where: { reportWorkBlockId } });
  }

  async buildings(tx: Prisma.TransactionClient, workUnits: ReportWorkUnit[]) {
    const buildingIds = (
      await tx.reportBuilding.findMany({
        where: { id: { in: workUnits.map((w) => w.reportBuildingId) } },
        select: { buildingId: true },
      })
    ).map((rb) => rb.buildingId);

    return tx.building.findMany({ where: { id: { in: buildingIds } } });
  }

  async locations(
    tx: Prisma.TransactionClient,
    buildings: Building[],
  ): Promise<Location[]> {
    const locationIds = buildings
      .map((b) => b.locationId)
      .filter((id) => id !== null);

    return tx.location.findMany({
      where: { id: { in: locationIds } },
    });
  }

  async roofs(
    tx: Prisma.TransactionClient,
    buildings: Building[],
  ): Promise<Roof[]> {
    const roofIds = buildings.map((b) => b.id);
    return tx.roof.findMany({
      where: { buildingId: { in: roofIds } },
    });
  }

  async gutters(
    tx: Prisma.TransactionClient,
    buildings: Building[],
  ): Promise<Gutter[]> {
    const gutterIds = buildings.map((b) => b.id);
    return tx.gutter.findMany({
      where: { buildingId: { in: gutterIds } },
    });
  }

  async substrates(
    tx: Prisma.TransactionClient,
    buildings: Building[],
  ): Promise<Substrate[]> {
    const substrateIds = buildings.map((b) => b.id);
    return tx.substrate.findMany({
      where: { buildingId: { in: substrateIds } },
    });
  }

  async windows(
    tx: Prisma.TransactionClient,
    buildings: Building[],
  ): Promise<Window[]> {
    const windowIds = buildings.map((b) => b.id);
    return tx.window.findMany({
      where: { buildingId: { in: windowIds } },
    });
  }
}
