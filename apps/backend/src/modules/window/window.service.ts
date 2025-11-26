import { Injectable } from '@nestjs/common';
import { BasePrismaService } from 'src/common/services/base-prisma.service';
import {
  Window,
  CreateWindowDto,
  UpdateWindowDto,
} from '@aps/shared-types';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class WindowService extends BasePrismaService<
  Window,
  CreateWindowDto,
  UpdateWindowDto
> {
  constructor(private prisma: PrismaService) {
    super(prisma.window as any, 'Window');
  }

  async findAllByBuilding(buildingId: string): Promise<Window[]> {
    await this.prisma.building.findUniqueOrThrow({
      where: { id: buildingId },
    });
    return this.prisma.window.findMany({
      where: { buildingId },
    });
  }
}

