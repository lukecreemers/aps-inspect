import { BadRequestException, Injectable } from '@nestjs/common';
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

  async create(createBuildingDto: CreateBuildingDto): Promise<Building> {
    const { clientId, locationId } = createBuildingDto;
    if (locationId) {
      const location = await this.prisma.location.findUnique({
        where: { id: locationId },
      });
      if (location && clientId !== location.clientId) {
        throw new BadRequestException('Location does not belong to client');
      }
    }

    return this.prisma.building.create({
      data: {
        ...createBuildingDto,

        roofs: {
          create: [{}],
        },
        gutters: {
          create: [{}],
        },
        substrates: {
          create: [{}],
        },
        windows: {
          create: [{}],
        },
      },
    });
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

  // Returns all active buildings by client, including buildings with no location, excludes buildings in inactive locations.
  async findAllActiveByClient(clientId: string): Promise<Building[]> {
    return this.prisma.building.findMany({
      where: {
        clientId,
        isActive: true,
        OR: [{ locationId: null }, { location: { isActive: true } }],
      },
    });
  }

  async softDelete(id: string): Promise<Building> {
    return this.prisma.building.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
