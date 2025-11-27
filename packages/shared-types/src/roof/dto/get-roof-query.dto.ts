import { z } from "zod";
import { PaginationSchema } from "../../helpers/pagination.dto";

export const GetRoofsQuerySchema = PaginationSchema.extend({
  buildingId: z.string().uuid().optional(),
  isActive: z.stringbool().optional(),
});

export type GetRoofsQueryDto = z.infer<typeof GetRoofsQuerySchema>;

