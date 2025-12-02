import { z } from "zod";

export const PaginationSchema = z.object({
  take: z.coerce.number().min(1).max(100).optional(),
  skip: z.coerce.number().min(0).optional(),
});

export type PaginationDto = z.infer<typeof PaginationSchema>;
