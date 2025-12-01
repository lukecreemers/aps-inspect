import { z } from "zod";
import { PaginationSchema } from "../../helpers/pagination.dto";
import { WorkBlockStatusSchema } from "../../generated/zod";

export const GetReportWorkBlocksQuerySchema = PaginationSchema.extend({
  reportId: z.string().uuid().optional(),
  contractorId: z.string().uuid().optional(),
  status: WorkBlockStatusSchema.optional(),
});

export type GetReportWorkBlocksQueryDto = z.infer<
  typeof GetReportWorkBlocksQuerySchema
>;
