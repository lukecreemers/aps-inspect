import { z } from "zod";

export const GetBuildingsQuerySchema = z.object({
  locationId: z.string().uuid().optional(),
  clientId: z.string().uuid().optional(),
  isActive: z.coerce.boolean().optional(),
  take: z.coerce.number().min(1).max(100).optional(),
  skip: z.coerce.number().min(0).optional(),
});

export type GetBuildingsQueryDto = z.infer<typeof GetBuildingsQuerySchema>;
