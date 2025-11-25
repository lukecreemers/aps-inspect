import type {
  Client,
  CreateClientDto,
  UpdateClientDto,
} from '@aps/shared-types';
import { Injectable } from '@nestjs/common';
import { BasePrismaService } from 'src/common/services/base-prisma.service';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ClientService extends BasePrismaService<
  Client,
  CreateClientDto,
  UpdateClientDto
> {
  constructor(private prisma: PrismaService) {
    super(prisma.client as any, 'Client');
  }

  async findAll(): Promise<Client[]> {
    return this.prisma.client.findMany();
  }
}
