import { z } from "zod";
import { WorkBlockStatusSchema } from "../../generated/zod";

export const UpdateReportWorkBlockSchema = z.object({
  status: WorkBlockStatusSchema.optional(),
  contractorId: z.string().uuid().optional(),
});

export type UpdateReportWorkBlockDto = z.infer<
  typeof UpdateReportWorkBlockSchema
>;
