import { z } from "zod";
import { ReportTypeSchema } from "../../generated/zod";

export const CreateReportWorkUnitSchema = z.object({
  reportId: z.string().uuid(),
  buildingId: z.string().uuid(),
  type: ReportTypeSchema,
  contractorId: z.string().uuid().nullable().optional(),
});

export type CreateReportWorkUnitDto = z.infer<
  typeof CreateReportWorkUnitSchema
>;
