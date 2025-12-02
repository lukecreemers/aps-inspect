import { Building, Prisma, ReportType } from '@prisma/client';

export interface ReportTypeHandler {
  type: ReportType;

  loadOne(tx: Prisma.TransactionClient, building: Building): Promise<any>;

  mapOne(raw: any): Promise<any>;
}
