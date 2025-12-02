import {
  Building,
  ControllerPullDto,
  ControllerPullResponse,
  Location,
  ReportWorkUnit,
  Roof,
  Window,
} from '@aps/shared-types';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Gutter, Prisma, Substrate } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import crypto from 'crypto';
import { Logger } from '@nestjs/common';
import { ContractorPullAuthService } from './contractor-pull-auth.service';
import { ContractorPullFetchService } from './contractor-pull-fetch.service';
import { ContractorPullAssembleService } from './contractor-pull-assemble.service';

@Injectable()
export class ContractorPullService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auth: ContractorPullAuthService,
    private readonly fetch: ContractorPullFetchService,
    private readonly assemble: ContractorPullAssembleService,
  ) {}

  async pull(
    body: ControllerPullDto,
    reportWorkBlockId: string,
  ): Promise<ControllerPullResponse> {
    return await this.prisma.$transaction(async (tx) => {
      const workBlock = await this.auth.validate(tx, reportWorkBlockId, body);

      const workUnits = await this.fetch.workUnits(tx, reportWorkBlockId);
      const buildings = await this.fetch.buildings(tx, workUnits);
      const locations = await this.fetch.locations(tx, buildings);

      const data = await this.assemble.byReportTypes(tx, workUnits, buildings);

      // const workUnits = await tx.reportWorkUnit.findMany({
      //   where: { reportWorkBlockId },
      // });

      // const types = workUnits.map((wu) => wu.type);
      // const uniqueTypes = [...new Set(types)];
      // Logger.log(`Types: ${uniqueTypes}`);

      // const buildings = await this.findBuildings(tx, workUnits);
      // const locations = await this.findLocations(tx, buildings);
      // let roofs: Roof[] = [];
      // let gutters: Gutter[] = [];
      // let substrates: Substrate[] = [];
      // let windows: Window[] = [];

      // if (uniqueTypes.includes('ROOF')) {
      //   roofs = await this.findRoofs(tx, buildings);
      //   gutters = await this.findGutters(tx, buildings);
      // }
      // if (uniqueTypes.includes('EXTERIOR')) {
      //   substrates = await this.findSubstrates(tx, buildings);
      //   windows = await this.findWindows(tx, buildings);
      // }

      return {
        syncToken: crypto.randomBytes(32).toString('hex'),
        buildings,
        locations,
        ...data,
      };
    });
  }

  async findBuildings(
    tx: Prisma.TransactionClient,
    workUnits: ReportWorkUnit[],
  ): Promise<Building[]> {
    const reportBuildings = await tx.reportBuilding.findMany({
      where: { id: { in: workUnits.map((wu) => wu.reportBuildingId) } },
      select: { buildingId: true },
    });

    const buildingIds = reportBuildings.map((rb) => rb.buildingId);

    Logger.log(`Finding buildings for work units: ${buildingIds}`);

    return tx.building.findMany({
      where: { id: { in: buildingIds } },
    });
  }

  async findLocations(
    tx: Prisma.TransactionClient,
    buildings: Building[],
  ): Promise<Location[]> {
    const locationIds = buildings
      .map((b) => b.locationId)
      .filter((id) => id !== null);
    Logger.log(`Finding locations: ${locationIds}`);

    return tx.location.findMany({
      where: { id: { in: locationIds } },
    });
  }

  async findRoofs(
    tx: Prisma.TransactionClient,
    buildings: Building[],
  ): Promise<Roof[]> {
    const roofIds = buildings.map((b) => b.id);
    Logger.log(`Finding roofs: ${roofIds}`);
    return tx.roof.findMany({
      where: { buildingId: { in: roofIds } },
    });
  }

  async findGutters(
    tx: Prisma.TransactionClient,
    buildings: Building[],
  ): Promise<Gutter[]> {
    const gutterIds = buildings.map((b) => b.id);
    Logger.log(`Finding gutters: ${gutterIds}`);
    return tx.gutter.findMany({
      where: { buildingId: { in: gutterIds } },
    });
  }

  async findSubstrates(
    tx: Prisma.TransactionClient,
    buildings: Building[],
  ): Promise<Substrate[]> {
    const substrateIds = buildings.map((b) => b.id);
    Logger.log(`Finding substrates: ${substrateIds}`);
    return tx.substrate.findMany({
      where: { buildingId: { in: substrateIds } },
    });
  }

  async findWindows(
    tx: Prisma.TransactionClient,
    buildings: Building[],
  ): Promise<Window[]> {
    const windowIds = buildings.map((b) => b.id);
    Logger.log(`Finding windows: ${windowIds}`);
    return tx.window.findMany({
      where: { buildingId: { in: windowIds } },
    });
  }
}
