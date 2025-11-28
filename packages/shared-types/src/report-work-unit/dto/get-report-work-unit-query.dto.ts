import { z } from "zod";
import { PaginationSchema } from "../../helpers/pagination.dto";

export const GetReportWorkUnitsQuerySchema = PaginationSchema.extend({
  // TODO: Add fields here
});

export type GetReportWorkUnitsQueryDto = z.infer<typeof GetReportWorkUnitsQuerySchema>;
