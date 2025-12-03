import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export abstract class BaseInspectionService<T> {
  protected abstract getDelegate(tx: Prisma.TransactionClient): {
    findFirst: (args: any) => Promise<T | null>;
  };

  async getLatestInspection(
    tx: Prisma.TransactionClient,
    id: string,
  ): Promise<T | null> {
    const delegate = this.getDelegate(tx);

    return delegate.findFirst({
      where: this.filterById(id),
      orderBy: { createdAt: 'desc' },
    });
  }

  protected abstract filterById(id: string): Record<string, any>;
}
