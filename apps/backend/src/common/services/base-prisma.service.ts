import { Injectable } from '@nestjs/common';

export interface PrismaDelegate<T, CreateDto, UpdateDto> {
  findMany(args?: any): Promise<T[]>;
  findUnique(args: any): Promise<T | null>;
  findUniqueOrThrow(args: any): Promise<T>;
  create(args: { data: CreateDto }): Promise<T>;
  update(args: { where: any; data: UpdateDto }): Promise<T>;
  delete(args: { where: any }): Promise<T>;
}

@Injectable()
export abstract class BasePrismaService<T, CreateDto, UpdateDto> {
  constructor(
    protected readonly modelDelegate: PrismaDelegate<T, CreateDto, UpdateDto>,
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

  async update(id: string, data: UpdateDto): Promise<T> {
    return this.modelDelegate.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<T> {
    return this.modelDelegate.delete({
      where: { id },
    });
  }
}
