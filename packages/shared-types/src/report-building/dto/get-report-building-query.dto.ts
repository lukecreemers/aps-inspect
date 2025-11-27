import { z } from "zod";
import { PaginationSchema } from "../../helpers/pagination.dto";

export const GetReportBuildingsQuerySchema = PaginationSchema.extend({
  reportId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional(),
});

export type GetReportBuildingsQueryDto = z.infer<
  typeof GetReportBuildingsQuerySchema
>;
