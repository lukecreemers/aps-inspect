import {
  BuildingBundle,
  ContractorPullDto,
  ContractorPullResponse,
  RoofBundle,
} from '@aps/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ContractorPullAuthService } from './contractor-pull-auth.service';
import { ContractorPullFetchService } from './contractor-pull-fetch.service';
import { Logger } from '@nestjs/common';
import { ReportTypeHandlerRegistry } from './handlers/report-type-handler-registry';
import { ReportType } from '@prisma/client';
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
      const workBlock = await this.auth.validate(tx, workBlockId, body);

      const workUnits = await this.fetch.workUnits(tx, workBlockId);
      const types = await this.fetch.types(workUnits);

      const buildings = await this.fetch.buildings(tx, workUnits);
      const locations = await this.fetch.locations(tx, buildings);

      const buildingBundles: BuildingBundle[] = buildings.map((building) => ({
        building,
        location: locations.find((l) => l.id === building.locationId) ?? null,
        roof: undefined,
      }));

      for (const type of types) {
        const handler = this.registry.get(type);

        if (!handler) {
          throw new Error(`No handler registered for report type ${type}`);
        }

        for (let i = 0; i < buildings.length; i++) {
          const building = buildings[i];

          const mapped = await handler.createBundle(tx, building);

          switch (type) {
            case ReportType.ROOF:
              buildingBundles[i].roof = mapped as RoofBundle;
              break;
          }
        }
      }

      const response: ContractorPullResponse = {
        syncToken: crypto.randomBytes(32).toString('hex'),
        locations,
        buildings: buildingBundles,
      };

      Logger.log(`Contractor pull prepared for workBlock ${workBlockId}`);

      return response;
    });
  }
}
