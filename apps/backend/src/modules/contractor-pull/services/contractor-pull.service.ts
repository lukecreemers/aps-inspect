import { ControllerPullDto, ControllerPullResponse } from '@aps/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import crypto from 'crypto';
import { ContractorPullAuthService } from './contractor-pull-auth.service';
import { ContractorPullFetchService } from './contractor-pull-fetch.service';
import { ContractorPullAssembleService } from './contractor-pull-assemble.service';
import { ContractorPullAssignService } from './contractor-pull-assign.service';

@Injectable()
export class ContractorPullService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auth: ContractorPullAuthService,
    private readonly fetch: ContractorPullFetchService,
    private readonly assemble: ContractorPullAssembleService,
    private readonly assign: ContractorPullAssignService,
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

      await this.assign.assign(tx, workUnits, workBlock);

      return {
        syncToken: crypto.randomBytes(32).toString('hex'),
        buildings,
        locations,
        ...data,
      };
    });
  }
}
