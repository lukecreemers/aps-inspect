import { Injectable } from '@nestjs/common';
import { BasePrismaService } from 'src/common/services/base-prisma.service';
import { Gutter, CreateGutterDto, UpdateGutterDto } from '@aps/shared-types';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class GutterService extends BasePrismaService<
  Gutter,
  CreateGutterDto,
  UpdateGutterDto
> {
  constructor(private prisma: PrismaService) {
    super(prisma.gutter as any, 'Gutter');
  }

  async findAllByBuilding(buildingId: string): Promise<Gutter[]> {
    await this.prisma.building.findUniqueOrThrow({
      where: { id: buildingId },
    });
    return this.prisma.gutter.findMany({
      where: { buildingId },
    });
  }
}
