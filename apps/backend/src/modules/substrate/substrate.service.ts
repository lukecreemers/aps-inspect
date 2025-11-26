import { Injectable } from '@nestjs/common';
import { BasePrismaService } from 'src/common/services/base-prisma.service';
import {
  Substrate,
  CreateSubstrateDto,
  UpdateSubstrateDto,
} from '@aps/shared-types';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class SubstrateService extends BasePrismaService<
  Substrate,
  CreateSubstrateDto,
  UpdateSubstrateDto
> {
  constructor(private prisma: PrismaService) {
    super(prisma.substrate as any, 'Substrate');
  }

  async findAllByBuilding(buildingId: string): Promise<Substrate[]> {
    await this.prisma.building.findUniqueOrThrow({
      where: { id: buildingId },
    });
    return this.prisma.substrate.findMany({
      where: { buildingId },
    });
  }
}

