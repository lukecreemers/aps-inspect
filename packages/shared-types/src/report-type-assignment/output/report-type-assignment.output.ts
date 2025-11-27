import { z } from "zod";
import { ReportTypeAssignmentSchema } from "../../generated/zod";

export const ReportTypeAssignmentResponseSchema =
  ReportTypeAssignmentSchema.omit({
    id: true,
  });

export type ReportTypeAssignmentResponse = z.infer<
  typeof ReportTypeAssignmentResponseSchema
>;
