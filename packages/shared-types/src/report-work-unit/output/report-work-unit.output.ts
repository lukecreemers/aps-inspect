import { z } from "zod";
import { ReportWorkUnitSchema } from "../../generated/zod";

export const ReportWorkUnitResponseSchema = ReportWorkUnitSchema.omit({
  createdAt: true,
  updatedAt: true,
}).strip();

export type ReportWorkUnitResponse = z.infer<typeof ReportWorkUnitResponseSchema>;
