import {
  CreateLocationDto,
  Location,
  UpdateLocationDto,
} from '@aps/shared-types';
import { Injectable } from '@nestjs/common';
import { BasePrismaService } from 'src/common/services/base-prisma.service';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class LocationService extends BasePrismaService<
  Location,
  CreateLocationDto,
  UpdateLocationDto
> {
  constructor(private prisma: PrismaService) {
    super(prisma.location as any, 'Location');
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
