import { Injectable } from '@nestjs/common';
import { ReportTypeHandler } from './report-type.handler';
import { ReportType } from '@prisma/client';
import { RoofReportHandler } from './roof-report.handler';

@Injectable()
export class ReportTypeHandlerRegistry {
  constructor(roof: RoofReportHandler) {
    this.register(ReportType.ROOF, roof);
  }
  private handlers = new Map<string, ReportTypeHandler<any>>();

  register<T>(type: ReportType, handler: ReportTypeHandler<T>) {
    this.handlers.set(type, handler);
  }

  get<T>(type: ReportType): ReportTypeHandler<T> {
    const handler = this.handlers.get(type);
    if (!handler) throw new Error(`Handler missing for ${type}`);
    return handler as ReportTypeHandler<T>;
  }
}
