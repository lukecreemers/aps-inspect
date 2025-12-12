import { z } from "zod";
import { ReportTypeSchema } from "../../generated/zod";

export const UpdateReportTypeAssignmentSchema = z.object({
  // TODO: Add fields here
  type: ReportTypeSchema.optional(),
  title: z.string().optional(),
});

export type UpdateReportTypeAssignmentDto = z.infer<
  typeof UpdateReportTypeAssignmentSchema
>;
