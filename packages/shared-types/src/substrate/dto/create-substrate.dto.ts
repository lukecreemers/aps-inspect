import { z } from "zod";

export const CreateSubstrateSchema = z.object({
  buildingId: z.string().uuid(),
});

export type CreateSubstrateDto = z.infer<typeof CreateSubstrateSchema>;
