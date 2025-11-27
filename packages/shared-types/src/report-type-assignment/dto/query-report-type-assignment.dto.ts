import { z } from "zod";
import { ReportTypeSchema } from "../../generated/zod";
import { PaginationSchema } from "../../helpers/pagination.dto";

export const QueryReportTypeAssignmentSchema = PaginationSchema.extend({
  reportId: z.string().optional(),
  type: ReportTypeSchema.optional(),
});

export type QueryReportTypeAssignmentDto = z.infer<
  typeof QueryReportTypeAssignmentSchema
>;
