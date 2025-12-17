import {
  BuildingBundle,
  ContractorPullDto,
  ContractorPullResponse,
  ExteriorBundle,
  Location,
  RoofBundle,
} from '@aps/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ContractorPullAuthService } from './contractor-pull-auth.service';
import { ContractorPullFetchService } from './contractor-pull-fetch.service';
import { Logger } from '@nestjs/common';
import { ReportTypeHandlerRegistry } from './handlers/report-type-handler-registry';
import {
  Building,
  Prisma,
  ReportType,
  WorkBlockStatus,
  WorkUnitStatus,
} from '@prisma/client';
import crypto from 'crypto';

@Injectable()
export class ContractorPullService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auth: ContractorPullAuthService,
    private readonly fetch: ContractorPullFetchService,
    private registry: ReportTypeHandlerRegistry,
  ) {}

  async pull(
    body: ContractorPullDto,
    workBlockId: string,
  ): Promise<ContractorPullResponse> {
    return await this.prisma.$transaction(async (tx) => {
      await this.auth.validate(tx, workBlockId, body);

      const workUnits = await this.fetch.workUnits(tx, workBlockId);
      const types = this.fetch.types(workUnits);

      const buildings = await this.fetch.buildings(tx, workUnits);
      const locations = await this.fetch.locations(tx, buildings);

      const buildingBundles = this.initialiseBuildingBundles(
        buildings,
        locations,
      );

      await this.attachBundles(
        tx,
        Array.from(types) as ReportType[],
        buildings,
        buildingBundles,
      );

      await this.assignWorkBlock(tx, workBlockId);

      const response: ContractorPullResponse = {
        syncToken: crypto.randomBytes(32).toString('hex'),
        locations,
        buildings: buildingBundles,
      };

      Logger.log(`Contractor pull prepared for workBlock ${workBlockId}`);

      return response;
    });
  }

  private initialiseBuildingBundles(
    buildings: Building[],
    locations: Location[],
  ): BuildingBundle[] {
    return buildings.map((building) => ({
      building,
      location: locations.find((l) => l.id === building.locationId) ?? null,
      roof: undefined,
      exterior: undefined,
    }));
  }

  private async attachBundles(
    tx: Prisma.TransactionClient,
    types: ReportType[],
    buildings: Building[],
    bundles: BuildingBundle[],
  ) {
    for (const type of types) {
      const handler = this.registry.get(type);

      for (let i = 0; i < buildings.length; i++) {
        const bundle = await handler.createBundle(tx, buildings[i]);

        if (type === ReportType.ROOF) {
          bundles[i].roof = bundle as RoofBundle;
        } else if (type === ReportType.EXTERIOR) {
          bundles[i].exterior = bundle as ExteriorBundle;
        }
      }
    }
  }

  private async assignWorkBlock(
    tx: Prisma.TransactionClient,
    workBlockId: string,
  ) {
    await tx.reportWorkBlock.update({
      where: { id: workBlockId },
      data: { status: WorkBlockStatus.IN_PROGRESS },
    });
  }
}
