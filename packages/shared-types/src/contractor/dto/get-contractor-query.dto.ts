import { z } from "zod";
import { PaginationSchema } from "../../helpers/pagination.dto";

export const GetContractorsQuerySchema = PaginationSchema.extend({
  isActive: z.stringbool().optional(),
});

export type GetContractorsQueryDto = z.infer<typeof GetContractorsQuerySchema>;
