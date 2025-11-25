import { Injectable } from '@nestjs/common';
import {
  Building,
  CreateBuildingDto,
  UpdateBuildingDto,
} from '@aps/shared-types';
import { BasePrismaService } from 'src/common/services/base-prisma.service';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class BuildingService extends BasePrismaService<
  Building,
  CreateBuildingDto,
  UpdateBuildingDto
> {
  constructor(private prisma: PrismaService) {
    super(prisma.building as any, 'Building');
  }

  async findAllByLocation(locationId: string): Promise<Building[]> {
    await this.prisma.location.findUniqueOrThrow({
      where: { id: locationId },
    });
    return this.prisma.building.findMany({
      where: {
        locationId,
      },
    });
  }

  async findAllByClient(clientId: string): Promise<Building[]> {
    await this.prisma.client.findUniqueOrThrow({
      where: { id: clientId },
    });

    return this.prisma.building.findMany({
      where: {
        clientId,
      },
    });
  }
}
