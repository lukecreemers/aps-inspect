import { z } from "zod";

export const UpdateClientSchema = z.object({
  name: z.string().min(1).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type UpdateClientDto = z.infer<typeof UpdateClientSchema>;
