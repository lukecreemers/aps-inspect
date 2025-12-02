import { z } from "zod";
import { ReportWorkUnitSchema } from "../../generated/zod";

export const ReportWorkUnitResponseSchema = ReportWorkUnitSchema;

export type ReportWorkUnitResponse = z.infer<
  typeof ReportWorkUnitResponseSchema
>;
