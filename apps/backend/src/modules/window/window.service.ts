import { Injectable, Logger } from '@nestjs/common';
import { BasePrismaService } from 'src/common/services/base-prisma.service';
import {
  Window,
  CreateWindowDto,
  UpdateWindowDto,
  GetWindowsQueryDto,
} from '@aps/shared-types';
import { PrismaService } from 'src/database/prisma.service';
import { activeFilter } from 'src/common/filters/active-filter';

@Injectable()
export class WindowService extends BasePrismaService<
  Window,
  CreateWindowDto,
  UpdateWindowDto
> {
  private readonly logger = new Logger(WindowService.name);

  constructor(private prisma: PrismaService) {
    super(prisma.window as any, 'Window');
  }

  async findWindows(query: GetWindowsQueryDto): Promise<Window[]> {
    this.logger.log(query);
    return this.prisma.window.findMany({
      where: {
        buildingId: query.buildingId,
        removedAt: activeFilter(query.isActive),
      },
      take: query.take,
      skip: query.skip,
      orderBy: { createdAt: 'desc' },
    });
  }

  async softDelete(id: string): Promise<Window> {
    return this.prisma.window.update({
      where: { id },
      data: { removedAt: new Date() },
    });
  }
}
