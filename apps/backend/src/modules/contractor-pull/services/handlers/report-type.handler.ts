import { Building, Prisma, ReportType } from '@prisma/client';

export interface ReportTypeHandler {
  type: ReportType;

  createBundle(tx: Prisma.TransactionClient, building: Building): Promise<any>;
}
