import { Injectable, Logger } from '@nestjs/common';
import {
  BasePrismaService,
  PrismaDelegate,
} from 'src/common/services/base-prisma.service';
import {
  Substrate,
  CreateSubstrateDto,
  UpdateSubstrateDto,
  GetSubstratesQueryDto,
} from '@aps/shared-types';
import { PrismaService } from 'src/database/prisma.service';
import { activeFilter } from 'src/common/filters/active-filter';

@Injectable()
export class SubstrateService extends BasePrismaService<
  Substrate,
  CreateSubstrateDto,
  UpdateSubstrateDto
> {
  private readonly logger = new Logger(SubstrateService.name);

  constructor(private prisma: PrismaService) {
    super(
      prisma.substrate as unknown as PrismaDelegate<
        Substrate,
        CreateSubstrateDto,
        UpdateSubstrateDto
      >,
      'Substrate',
    );
  }

  async findSubstrates(query: GetSubstratesQueryDto): Promise<Substrate[]> {
    this.logger.log(query);
    return this.prisma.substrate.findMany({
      where: {
        buildingId: query.buildingId,
        removedAt: activeFilter(query.isActive),
      },
      take: query.take,
      skip: query.skip,
      orderBy: { createdAt: 'desc' },
    });
  }

  async softDelete(id: string): Promise<Substrate> {
    return this.prisma.substrate.update({
      where: { id },
      data: { removedAt: new Date() },
    });
  }
}
