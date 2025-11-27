import { z } from "zod";
import { PaginationSchema } from "../../helpers/pagination.dto";

export const GetReportBuildingsQuerySchema = PaginationSchema.extend({
  // TODO: Add fields here
});

export type GetReportBuildingsQueryDto = z.infer<typeof GetReportBuildingsQuerySchema>;
