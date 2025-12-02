import { Injectable } from '@nestjs/common';
import {
  BasePrismaService,
  PrismaDelegate,
} from 'src/common/services/base-prisma.service';
import {
  MapImage,
  CreateMapImageDto,
  UpdateMapImageDto,
} from '@aps/shared-types';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MapImageService extends BasePrismaService<
  MapImage,
  CreateMapImageDto,
  UpdateMapImageDto
> {
  constructor(private prisma: PrismaService) {
    super(
      prisma.mapImage as unknown as PrismaDelegate<
        MapImage,
        CreateMapImageDto,
        UpdateMapImageDto
      >,
      'MapImage',
    );
  }

  async findAllByMap(mapId: string): Promise<MapImage[]> {
    await this.prisma.map.findUniqueOrThrow({
      where: { id: mapId },
    });
    return this.prisma.mapImage.findMany({
      where: { mapId },
    });
  }
}
