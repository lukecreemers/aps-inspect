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
    const { clientId, locationId, name } = createBuildingDto;
    if (locationId) {
      const location = await this.prisma.location.findUnique({
        where: { id: locationId },
      });
      if (location && clientId !== location.clientId) {
        throw new BadRequestException('Location does not belong to client');
      }
    }

    // Check for duplicate name when locationId is null
    if (!locationId && name) {
      const existingBuilding = await this.prisma.building.findFirst({
        where: {
          clientId,
          name,
          locationId: null,
        },
      });
      if (existingBuilding) {
        throw new BadRequestException(
          'A building with this name already exists for this client without a location',
        );
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

  // Updaes a building, if it updating a location, it must belong to the same client.
  async update(id: string, data: UpdateBuildingDto): Promise<Building> {
    const { locationId, name } = data;
    const building = await this.prisma.building.findUniqueOrThrow({
      where: { id },
    });

    // Check if locationId is explicitly provided (including null)
    const locationIdProvided = 'locationId' in data;
    const finalLocationId = locationIdProvided
      ? locationId
      : building.locationId;
    const finalName = name ?? building.name;

    // Validate location belongs to client if a locationId is being set
    if (locationId) {
      const location = await this.prisma.location.findUnique({
        where: { id: locationId },
      });
      if (location && building.clientId !== location.clientId) {
        throw new BadRequestException(
          'Location does not belong to same client',
        );
      }
    }

    // Check for duplicate name when locationId is null (or being set to null)
    // We need to check if:
    // 1. The final locationId will be null AND
    // 2. Either name is being updated OR locationId is being set to null
    if (!finalLocationId) {
      // Only check if we're updating the name or setting locationId to null
      const isUpdatingName = name !== undefined;
      const isSettingLocationToNull = locationIdProvided && locationId === null;

      if (isUpdatingName || isSettingLocationToNull) {
        const existingBuilding = await this.prisma.building.findFirst({
          where: {
            clientId: building.clientId,
            name: finalName,
            locationId: null,
            id: { not: id }, // Exclude the current building
          },
        });
        if (existingBuilding) {
          throw new BadRequestException(
            'A building with this name already exists for this client without a location',
          );
        }
      }
    }

    return this.prisma.building.update({
      where: { id },
      data: data as any,
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
