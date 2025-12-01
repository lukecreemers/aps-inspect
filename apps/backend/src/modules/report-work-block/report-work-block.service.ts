import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  BasePrismaService,
  PrismaDelegate,
} from 'src/common/services/base-prisma.service';
import {
  ReportWorkBlock,
  CreateReportWorkBlockDto,
  UpdateReportWorkBlockDto,
} from '@aps/shared-types';
import { PrismaService } from 'src/database/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class ReportWorkBlockService extends BasePrismaService<
  ReportWorkBlock,
  CreateReportWorkBlockDto,
  UpdateReportWorkBlockDto
> {
  constructor(private prisma: PrismaService) {
    super(
      prisma.reportWorkBlock as unknown as PrismaDelegate<
        ReportWorkBlock,
        CreateReportWorkBlockDto,
        UpdateReportWorkBlockDto
      >,
      'ReportWorkBlock',
    );
  }

  async create(
    createReportWorkBlockDto: CreateReportWorkBlockDto,
  ): Promise<ReportWorkBlock> {
    const { reportWorkUnitIds, ...data } = createReportWorkBlockDto;
    const loginSecretText = crypto.randomBytes(4).toString('hex');

    return this.prisma.$transaction(async (tx) => {
      const reportWorkBlock = await tx.reportWorkBlock.create({
        data: {
          ...data,
          loginSecretText,
        },
      });

      if (reportWorkUnitIds && reportWorkUnitIds.length > 0) {
        await this.assignWorkUnitsToBlock(
          tx,
          reportWorkBlock.id,
          reportWorkUnitIds,
        );
      }
      return reportWorkBlock;
    });
  }

  private async assignWorkUnitsToBlock(
    tx: Prisma.TransactionClient,
    reportWorkBlockId: string,
    reportWorkUnitIds: string[],
  ) {
    const uniqueIds = [...new Set(reportWorkUnitIds)];

    const workUnits = await tx.reportWorkUnit.findMany({
      where: { id: { in: uniqueIds } },
      select: { id: true, reportWorkBlockId: true },
    });

    this.ensureAllWorkUnitsExist(workUnits, uniqueIds);
    this.ensureWorkUnitsAreNotAlreadyAssigned(workUnits);

    await tx.reportWorkUnit.updateMany({
      where: { id: { in: uniqueIds } },
      data: { reportWorkBlockId },
    });
  }

  private ensureAllWorkUnitsExist(
    workUnits: { id: string }[],
    expectedIds: string[],
  ) {
    if (workUnits.length !== expectedIds.length) {
      throw new NotFoundException(
        `One or more ReportWorkUnits not found. Expected ${expectedIds.length}, found ${workUnits.length}`,
      );
    }
  }

  private ensureWorkUnitsAreNotAlreadyAssigned(
    workUnits: { id: string; reportWorkBlockId: string | null }[],
  ) {
    const assigned = workUnits.filter((wu) => wu.reportWorkBlockId !== null);
    if (assigned.length > 0) {
      const ids = assigned.map((wu) => wu.id).join(', ');
      throw new BadRequestException(
        `The following ReportWorkUnits are already assigned: ${ids}`,
      );
    }
  }
}
