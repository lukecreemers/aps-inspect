import {
  BuildingBundle,
  ContractorPullDto,
  ContractorPullResponse,
  ExteriorBundle,
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
      await this.auth.validate(tx, workBlockId, body);

      const workUnits = await this.fetch.workUnits(tx, workBlockId);
      const types = this.fetch.types(workUnits);

      const buildings = await this.fetch.buildings(tx, workUnits);
      const locations = await this.fetch.locations(tx, buildings);

      const buildingBundles: BuildingBundle[] = buildings.map((building) => ({
        building,
        location: locations.find((l) => l.id === building.locationId) ?? null,
        roof: undefined,
      }));

      // Assemble Bundles

      for (const type of types) {
        switch (type) {
          case ReportType.ROOF: {
            const handler = this.registry.get<RoofBundle>(ReportType.ROOF);
            for (let i = 0; i < buildings.length; i++) {
              buildingBundles[i].roof = await handler.createBundle(
                tx,
                buildings[i],
              );
            }
            break;
          }
          case ReportType.EXTERIOR: {
            const handler = this.registry.get<ExteriorBundle>(
              ReportType.EXTERIOR,
            );
            for (let i = 0; i < buildings.length; i++) {
              buildingBundles[i].exterior = await handler.createBundle(
                tx,
                buildings[i],
              );
            }
            break;
          }
        }
      }

      // TODO: Update Work Units to IN_PROGRESS + update work block status to IN_PROGRESS

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
