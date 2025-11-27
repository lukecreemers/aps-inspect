import { Injectable } from '@nestjs/common';
import {
  BasePrismaService,
  PrismaDelegate,
} from 'src/common/services/base-prisma.service';
import {
  Gutter,
  CreateGutterDto,
  UpdateGutterDto,
  GetGuttersQueryDto,
} from '@aps/shared-types';
import { PrismaService } from 'src/database/prisma.service';
import { activeFilter } from 'src/common/filters/active-filter';

@Injectable()
export class GutterService extends BasePrismaService<
  Gutter,
  CreateGutterDto,
  UpdateGutterDto
> {
  constructor(private prisma: PrismaService) {
    super(
      prisma.gutter as unknown as PrismaDelegate<
        Gutter,
        CreateGutterDto,
        UpdateGutterDto
      >,
      'Gutter',
    );
  }

  async findGutters(query: GetGuttersQueryDto): Promise<Gutter[]> {
    return this.prisma.gutter.findMany({
      where: {
        buildingId: query.buildingId,
        removedAt: activeFilter(query.isActive),
      },
      take: query.take,
      skip: query.skip,
      orderBy: { createdAt: 'desc' },
    });
  }

  async softDelete(id: string): Promise<Gutter> {
    return this.prisma.gutter.update({
      where: { id },
      data: { removedAt: new Date() },
    });
  }
}
