import type { CreateClientDto, UpdateClientDto } from '@aps/shared-types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateClientDto) {
    return this.prisma.client.create({
      data: {
        name: data.name,
        metadata: data.metadata ?? {},
      },
    });
  }

  async findAll() {
    return this.prisma.client.findMany();
  }

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  async update(id: string, data: UpdateClientDto) {
    return this.prisma.client.update({
      where: { id },
      data: {
        name: data.name,
        metadata: data.metadata ?? {},
      },
    });
  }

  async delete(id: string) {
    return this.prisma.client.delete({
      where: { id },
    });
  }
}
