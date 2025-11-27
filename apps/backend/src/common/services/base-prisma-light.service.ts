import { Injectable } from '@nestjs/common';

export interface PrismaLightDelegate<T, CreateDto> {
  findMany(args?: any): Promise<T[]>;
  findUnique(args: any): Promise<T | null>;
  findUniqueOrThrow(args: any): Promise<T>;
  create(args: { data: CreateDto }): Promise<T>;
  delete(args: { where: any }): Promise<T>;
}

@Injectable()
export abstract class BasePrismaLightService<T, CreateDto> {
  constructor(
    protected readonly modelDelegate: PrismaLightDelegate<T, CreateDto>,
    protected readonly modelName: string,
  ) {}

  async create(data: CreateDto): Promise<T> {
    return this.modelDelegate.create({
      data,
    });
  }

  async findOne(id: string): Promise<T> {
    return this.modelDelegate.findUniqueOrThrow({
      where: { id },
    });
  }

  async delete(id: string): Promise<T> {
    return this.modelDelegate.delete({
      where: { id },
    });
  }
}
