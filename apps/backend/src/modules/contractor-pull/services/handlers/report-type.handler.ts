import { Building, Prisma, ReportType } from '@prisma/client';

export interface ReportTypeHandler<Bundle> {
  type: ReportType;

  createBundle(
    tx: Prisma.TransactionClient,
    building: Building,
  ): Promise<Bundle>;
}
