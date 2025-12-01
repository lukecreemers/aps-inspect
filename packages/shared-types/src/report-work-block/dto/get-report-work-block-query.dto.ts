import { z } from "zod";
import { PaginationSchema } from "../../helpers/pagination.dto";

export const GetReportWorkBlocksQuerySchema = PaginationSchema.extend({
  // TODO: Add fields here
});

export type GetReportWorkBlocksQueryDto = z.infer<typeof GetReportWorkBlocksQuerySchema>;
