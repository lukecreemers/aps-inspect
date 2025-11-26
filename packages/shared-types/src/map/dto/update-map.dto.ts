import { z } from "zod";

export const UpdateMapSchema = z.object({
  name: z.string().min(1).optional(),
  width: z.number().int().min(1).optional(),
  height: z.number().int().min(1).optional(),
  metadata: z.record(z.string(), z.any()).nullable().optional(),
});

export type UpdateMapDto = z.infer<typeof UpdateMapSchema>;
