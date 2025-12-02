import { Injectable } from '@nestjs/common';
import { ContractorPullFetchService } from './contractor-pull-fetch.service';
import { Building, Gutter, Prisma, Roof, Substrate } from '@prisma/client';
import { ReportWorkUnit, Window } from '@aps/shared-types';

@Injectable()
export class ContractorPullAssembleService {
  constructor(private readonly fetch: ContractorPullFetchService) {}

  async byReportTypes(
    tx: Prisma.TransactionClient,
    workUnits: ReportWorkUnit[],
    buildings: Building[],
  ): Promise<{
    roofs: Roof[];
    gutters: Gutter[];
    substrates: Substrate[];
    windows: Window[];
  }> {
    const types = [...new Set(workUnits.map((wu) => wu.type))];

    const out = {
      roofs: [] as Roof[],
      gutters: [] as Gutter[],
      substrates: [] as Substrate[],
      windows: [] as Window[],
    };

    if (types.includes('ROOF')) {
      out.roofs = await this.fetch.roofs(tx, buildings);
      out.gutters = await this.fetch.gutters(tx, buildings);
    }

    if (types.includes('EXTERIOR')) {
      out.substrates = await this.fetch.substrates(tx, buildings);
      out.windows = await this.fetch.windows(tx, buildings);
    }

    return out;
  }
}
