import { z } from "zod";
import { ReportTypeAssignmentSchema } from "../../generated/zod";

export const ReportTypeAssignmentResponseSchema =
  ReportTypeAssignmentSchema.omit({
    id: true,
  });

export type ReportTypeAssignmentResponse = z.infer<
  typeof ReportTypeAssignmentResponseSchema
>;

export const ReportTypeStatusResponseSchema = z.object({
  totalBuildings: z.number(),
  totalCompleted: z.number(),
  totalInProgress: z.number(),
});

export type ReportTypeStatusResponse = z.infer<
  typeof ReportTypeStatusResponseSchema
>;
