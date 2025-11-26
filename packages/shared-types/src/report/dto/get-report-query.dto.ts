import { z } from "zod";
import { ReportStatusSchema } from "../../generated/zod";
import { PaginationSchema } from "../../helpers/pagination.dto";

export const GetReportsQuerySchema = PaginationSchema.extend({
  type: z.enum(["standard", "system"]).optional(),
  status: ReportStatusSchema.optional(),
  clientId: z.string().uuid().optional(),
});

export type GetReportsQueryDto = z.infer<typeof GetReportsQuerySchema>;
