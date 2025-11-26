import { PrismaService } from 'src/database/prisma.service';
import { BuildingService } from './building.service';
import { Injectable } from '@nestjs/common';
import { CreateBuildingDto } from '@aps/shared-types';

@Injectable()
export class BuildingCreatorService {
  constructor(
    private buildingService: BuildingService,
    private prisma: PrismaService,
  ) {}

  async createBuildingWithDefaults(data: CreateBuildingDto) {
    return this.prisma.$transaction(async () => {
      const building = await this.buildingService.create(data);

      await this.prisma.roof.create({ data: { buildingId: building.id } });
      await this.prisma.gutter.create({ data: { buildingId: building.id } });
      await this.prisma.substrate.create({ data: { buildingId: building.id } });
      await this.prisma.window.create({ data: { buildingId: building.id } });

      return building;
    });
  }
}
