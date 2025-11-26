import { z } from "zod";
import { MapImageTypeSchema } from "../../generated/zod";

export const UpdateMapImageSchema = z.object({
  imageUrl: z.string().url().optional(),
  imageType: MapImageTypeSchema.optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type UpdateMapImageDto = z.infer<typeof UpdateMapImageSchema>;
