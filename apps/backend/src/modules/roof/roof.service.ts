import { Injectable, Logger } from '@nestjs/common';
import { BasePrismaService } from 'src/common/services/base-prisma.service';
import {
  Roof,
  CreateRoofDto,
  UpdateRoofDto,
  GetRoofsQueryDto,
} from '@aps/shared-types';
import { PrismaService } from 'src/database/prisma.service';
import { activeFilter } from 'src/common/filters/active-filter';

@Injectable()
export class RoofService extends BasePrismaService<
  Roof,
  CreateRoofDto,
  UpdateRoofDto
> {
  private readonly logger = new Logger(RoofService.name);

  constructor(private prisma: PrismaService) {
    super(prisma.roof as any, 'Roof');
  }

  async findRoofs(query: GetRoofsQueryDto): Promise<Roof[]> {
    this.logger.log(query);
    return this.prisma.roof.findMany({
      where: {
        buildingId: query.buildingId,
        removedAt: activeFilter(query.isActive),
      },
      take: query.take,
      skip: query.skip,
      orderBy: { createdAt: 'desc' },
    });
  }

  async softDelete(id: string): Promise<Roof> {
    return this.prisma.roof.update({
      where: { id },
      data: { removedAt: new Date() },
    });
  }
}
