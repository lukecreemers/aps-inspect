import { z } from "zod";
import { PaginationSchema } from "../../helpers/pagination.dto";

export const GetGuttersQuerySchema = PaginationSchema.extend({
  buildingId: z.string().uuid().optional(),
  isActive: z.stringbool().optional(),
});

export type GetGuttersQueryDto = z.infer<typeof GetGuttersQuerySchema>;
