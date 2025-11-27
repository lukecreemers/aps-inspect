import { z } from "zod";
import { PaginationSchema } from "../../helpers/pagination.dto";

export const GetWindowsQuerySchema = PaginationSchema.extend({
  buildingId: z.string().uuid().optional(),
  isActive: z.stringbool().optional(),
});

export type GetWindowsQueryDto = z.infer<typeof GetWindowsQuerySchema>;

