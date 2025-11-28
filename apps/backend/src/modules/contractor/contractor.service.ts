import {
  Contractor,
  CreateContractorDto,
  GetContractorsQueryDto,
  UpdateContractorDto,
} from '@aps/shared-types';
import {
  BasePrismaService,
  PrismaDelegate,
} from 'src/common/services/base-prisma.service';
import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ContractorService extends BasePrismaService<
  Contractor,
  CreateContractorDto,
  UpdateContractorDto
> {
  constructor(private prisma: PrismaService) {
    super(
      prisma.contractor as unknown as PrismaDelegate<
        Contractor,
        CreateContractorDto,
        UpdateContractorDto
      >,
      'Contractor',
    );
  }

  async findAll(query: GetContractorsQueryDto): Promise<Contractor[]> {
    return this.prisma.contractor.findMany({
      where: {
        isActive: query.isActive,
      },
      take: query.take,
      skip: query.skip,
    });
  }

  async softDelete(id: string): Promise<Contractor> {
    return this.update(id, { isActive: false });
  }
}
