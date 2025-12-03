import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export abstract class BaseInspectionService<T> {
  protected abstract readonly delegate: {
    findFirst: (...args: any[]) => Promise<T | null>;
  };

  async getLatestInspection(id: string): Promise<T | null> {
    const latest = await this.delegate.findFirst({
      where: this.filterById(id),
      orderBy: { createdAt: 'desc' },
    });

    return latest;
  }

  protected abstract filterById(id: string): Record<string, any>;
}
