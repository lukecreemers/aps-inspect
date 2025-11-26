import { Injectable } from '@nestjs/common';
import { BasePrismaService } from 'src/common/services/base-prisma.service';
import { Roof, CreateRoofDto, UpdateRoofDto } from '@aps/shared-types';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class RoofService extends BasePrismaService<
  Roof,
  CreateRoofDto,
  UpdateRoofDto
> {
  constructor(private prisma: PrismaService) {
    super(prisma.roof as any, 'Roof');
  }

  async findAllByBuilding(buildingId: string): Promise<Roof[]> {
    await this.prisma.building.findUniqueOrThrow({
      where: { id: buildingId },
    });
    return this.prisma.roof.findMany({
      where: { buildingId },
    });
  }
}
