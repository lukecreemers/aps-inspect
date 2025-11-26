import { z } from "zod";

export const UpdateGutterSchema = z.object({
  removedAt: z.coerce.date().nullable().optional(),
});

export type UpdateGutterDto = z.infer<typeof UpdateGutterSchema>;
