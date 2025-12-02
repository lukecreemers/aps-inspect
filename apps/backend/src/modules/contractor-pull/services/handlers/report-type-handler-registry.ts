import { Injectable } from '@nestjs/common';
import { ReportTypeHandler } from './report-type.handler';
import { RoofReportHandler } from './roof-report.handler';
import { ReportType } from '@prisma/client';

@Injectable()
export class ReportTypeHandlerRegistry {
  private handlers = new Map<string, ReportTypeHandler>();

  constructor(roof: RoofReportHandler) {
    this.handlers.set(ReportType.ROOF, roof);
  }

  get(type: string): ReportTypeHandler | null {
    return this.handlers.get(type) ?? null;
  }
}
