import type {
  Client,
  CreateClientDto,
  UpdateClientDto,
} from '@aps/shared-types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePrismaService } from 'src/common/services/base-prisma.service';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ClientService extends BasePrismaService<
  Client,
  CreateClientDto,
  UpdateClientDto
> {
  constructor(private prisma: PrismaService) {
    super(prisma.client, 'Client');
  }
}
