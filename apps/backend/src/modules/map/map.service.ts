import { Injectable } from '@nestjs/common';
import {
  BasePrismaService,
  PrismaDelegate,
} from 'src/common/services/base-prisma.service';
import { Map, CreateMapDto, UpdateMapDto } from '@aps/shared-types';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MapService extends BasePrismaService<
  Map,
  CreateMapDto,
  UpdateMapDto
> {
  constructor(private prisma: PrismaService) {
    super(
      prisma.map as unknown as PrismaDelegate<Map, CreateMapDto, UpdateMapDto>,
      'Map',
    );
  }

  async findAllByClient(clientId: string): Promise<Map[]> {
    await this.prisma.client.findUniqueOrThrow({
      where: { id: clientId },
    });
    return this.prisma.map.findMany({
      where: { clientId },
    });
  }
}
