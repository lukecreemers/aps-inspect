import { BadRequestException, Injectable } from '@nestjs/common';
import {
  Building,
  CreateBuildingDto,
  UpdateBuildingDto,
} from '@aps/shared-types';
import { BasePrismaService } from 'src/common/services/base-prisma.service';
import { PrismaService } from 'src/database/prisma.service';
import { BuildingCreatorService } from './building-creator.service';

@Injectable()
export class BuildingService extends BasePrismaService<
  Building,
  CreateBuildingDto,
  UpdateBuildingDto
> {
  constructor(
    private prisma: PrismaService,
    private buildingCreator: BuildingCreatorService,
  ) {
    super(prisma.building as any, 'Building');
  }

  async create(createBuildingDto: CreateBuildingDto): Promise<Building> {
    await this.validateNameUniqueness(createBuildingDto);
    await this.validateLocationClient(
      createBuildingDto.clientId,
      createBuildingDto.locationId,
    );

    return this.prisma.$transaction(async (tx) => {
      return this.buildingCreator.createBuildingWithDefaults(
        tx,
        createBuildingDto,
      );
    });
  }

  async update(id: string, data: UpdateBuildingDto): Promise<Building> {
    const building = await this.prisma.building.findUniqueOrThrow({
      where: { id },
    });

    const finalLocationId =
      data.locationId === undefined ? building.locationId : data.locationId;

    await this.validateNameUniqueness({
      ...building,
      ...data,
      locationId: finalLocationId,
    });

    if (data.locationId) {
      await this.validateLocationClient(building.clientId, data.locationId);
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

  // HELPER FUNCTIONS

  private async validateNameUniqueness(data: {
    clientId: string;
    name: string;
    locationId?: string | null;
    id?: string;
  }) {
    const { clientId, name, locationId, id } = data;

    const existing = await this.prisma.building.findFirst({
      where: {
        clientId,
        name,
        locationId: locationId ?? null,
        ...(id ? { id: { not: id } } : {}),
      },
    });
    if (existing) {
      throw new BadRequestException('Duplicate building name in this folder.');
    }
  }

  private async validateLocationClient(
    clientId: string,
    locationId?: string,
  ): Promise<void> {
    //
    console.log(locationId);
    if (locationId) {
      const location = await this.prisma.location.findUnique({
        where: { id: locationId },
      });
      if (location && clientId !== location.clientId) {
        throw new BadRequestException(
          'Location does not belong to same client',
        );
      }
    }
  }
}
