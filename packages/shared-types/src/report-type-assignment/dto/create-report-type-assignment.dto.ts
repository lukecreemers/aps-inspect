import { z } from "zod";
import { ReportTypeSchema } from "../../generated/zod";

export const CreateReportTypeAssignmentSchema = z.object({
  // TODO: Add fields here
  reportId: z.string(),
  type: ReportTypeSchema,
});

export type CreateReportTypeAssignmentDto = z.infer<
  typeof CreateReportTypeAssignmentSchema
>;
