import { z } from "zod";
import { PaginationSchema } from "../../helpers/pagination.dto";

export const GetContractorsQuerySchema = PaginationSchema.extend({
  isActive: z.boolean().optional(),
});

export type GetContractorsQueryDto = z.infer<typeof GetContractorsQuerySchema>;
