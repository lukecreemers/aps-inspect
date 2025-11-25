import { z } from "zod";

export const CreateLocationSchema = z.object({
  clientId: z.string().uuid(),
  name: z.string().min(1, "Location name is required"),
  isActive: z.boolean().default(true),
  address: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateLocationDto = z.infer<typeof CreateLocationSchema>;
