import { z } from "zod";

export const UpdateWindowSchema = z.object({
  removedAt: z.coerce.date().nullable().optional(),
});

export type UpdateWindowDto = z.infer<typeof UpdateWindowSchema>;
