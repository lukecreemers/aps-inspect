import { z } from "zod";
import { WorkUnitStatusSchema } from "../../generated/zod";

export const UpdateReportWorkUnitSchema = z.object({
  contractorId: z.string().uuid().nullable().optional(),
  status: WorkUnitStatusSchema.optional(),
  assignedAt: z.coerce.date().nullable().optional(),
  firstPulledAt: z.coerce.date().nullable().optional(),
  submittedAt: z.coerce.date().nullable().optional(),
  reviewedAt: z.coerce.date().nullable().optional(),
});

export type UpdateReportWorkUnitDto = z.infer<
  typeof UpdateReportWorkUnitSchema
>;
