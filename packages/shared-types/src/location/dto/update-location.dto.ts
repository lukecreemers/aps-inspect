import { z } from "zod";

export const UpdateLocationSchema = z.object({
  name: z.string().min(1).optional(),
  address: z.string().optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.string(), z.any()).nullable().optional(),
});

export type UpdateLocationDto = z.infer<typeof UpdateLocationSchema>;
