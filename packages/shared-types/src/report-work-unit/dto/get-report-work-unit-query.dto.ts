import { z } from "zod";
import { PaginationSchema } from "../../helpers/pagination.dto";
import { ReportTypeSchema, WorkUnitStatusSchema } from "../../generated/zod";

export const GetReportWorkUnitsQuerySchema = PaginationSchema.extend({
  type: ReportTypeSchema.optional(),
  status: WorkUnitStatusSchema.optional(),
  contractorId: z.string().uuid().optional(),
  reportId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional(),
});

export type GetReportWorkUnitsQueryDto = z.infer<
  typeof GetReportWorkUnitsQuerySchema
>;
