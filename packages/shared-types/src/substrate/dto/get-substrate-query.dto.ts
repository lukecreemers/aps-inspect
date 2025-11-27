import { z } from "zod";
import { PaginationSchema } from "../../helpers/pagination.dto";

export const GetSubstratesQuerySchema = PaginationSchema.extend({
  buildingId: z.string().uuid().optional(),
  isActive: z.stringbool().optional(),
});

export type GetSubstratesQueryDto = z.infer<typeof GetSubstratesQuerySchema>;

