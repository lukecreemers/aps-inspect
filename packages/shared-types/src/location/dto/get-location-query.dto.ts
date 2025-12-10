import { z } from "zod";

export const GetLocationQuerySchema = z.object({
  clientId: z.string().uuid(),
  isActive: z.boolean().optional(),
  take: z.coerce.number().min(1).max(100).optional(),
  skip: z.coerce.number().min(0).optional(),
});

export type GetLocationQueryDto = z.infer<typeof GetLocationQuerySchema>;
