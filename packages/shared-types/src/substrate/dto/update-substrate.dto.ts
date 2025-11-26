import { z } from "zod";

export const UpdateSubstrateSchema = z.object({
  removedAt: z.coerce.date().nullable().optional(),
});

export type UpdateSubstrateDto = z.infer<typeof UpdateSubstrateSchema>;
