import {
  CreateLocationDto,
  Location,
  UpdateLocationDto,
} from '@aps/shared-types';
import { GetLocationQueryDto } from '@aps/shared-types/src/location/dto/get-location-query.dto';
import { Injectable } from '@nestjs/common';
import {
  BasePrismaService,
  PrismaDelegate,
} from 'src/common/services/base-prisma.service';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class LocationService extends BasePrismaService<
  Location,
  CreateLocationDto,
  UpdateLocationDto
> {
  constructor(private prisma: PrismaService) {
    super(
      prisma.location as unknown as PrismaDelegate<
        Location,
        CreateLocationDto,
        UpdateLocationDto
      >,
      'Location',
    );
  }

  async findLocations(query: GetLocationQueryDto): Promise<Location[]> {
    return this.prisma.location.findMany({
      where: {
        clientId: query.clientId,
        isActive: query.isActive,
      },
      take: query.take,
      skip: query.skip,
    });
  }

  async findAllByClient(clientId: string): Promise<Location[]> {
    await this.prisma.client.findUniqueOrThrow({
      where: { id: clientId },
    });

    return this.prisma.location.findMany({
      where: {
        clientId,
      },
    });
  }

  async findAllActiveByClient(clientId: string): Promise<Location[]> {
    return this.prisma.location.findMany({
      where: {
        clientId,
        isActive: true,
      },
    });
  }

  async softDelete(id: string): Promise<Location> {
    return this.prisma.location.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
