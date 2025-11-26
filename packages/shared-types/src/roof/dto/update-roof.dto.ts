import { z } from "zod";

export const UpdateRoofSchema = z.object({
  removedAt: z.coerce.date().nullable().optional(),
});

export type UpdateRoofDto = z.infer<typeof UpdateRoofSchema>;
