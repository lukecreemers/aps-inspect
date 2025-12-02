import { Injectable } from '@nestjs/common';
import { CreateBuildingDto } from '@aps/shared-types';
import { Prisma } from '@prisma/client';

@Injectable()
export class BuildingCreatorService {
  constructor() {}

  async createBuildingWithDefaults(
    tx: Prisma.TransactionClient,
    data: CreateBuildingDto,
  ) {
    // Create the building
    const building = await tx.building.create({ data });

    // Create default associated entities
    await tx.roof.create({ data: { buildingId: building.id } });
    await tx.gutter.create({ data: { buildingId: building.id } });
    await tx.substrate.create({ data: { buildingId: building.id } });
    await tx.window.create({ data: { buildingId: building.id } });

    return building;
  }
}
