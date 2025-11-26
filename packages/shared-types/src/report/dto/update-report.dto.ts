import { z } from "zod";
import { ReportStatusSchema } from "../../generated/zod";

export const UpdateReportSchema = z.object({
  title: z.string().min(1).optional(),
  status: ReportStatusSchema.optional(),
});

export type UpdateReportDto = z.infer<typeof UpdateReportSchema>;
