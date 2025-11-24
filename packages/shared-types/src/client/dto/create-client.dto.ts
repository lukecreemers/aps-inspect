import { z } from "zod";

export const CreateClientSchema = z.object({
  name: z.string().min(1, "Client name is required"),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateClientDto = z.infer<typeof CreateClientSchema>;
