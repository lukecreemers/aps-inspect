import { z } from "zod";
import { MapImageTypeSchema } from "../../generated/zod";

export const CreateMapImageSchema = z.object({
  mapId: z.string().uuid(),
  imageUrl: z.string().url(),
  imageType: MapImageTypeSchema.default("BASE"),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateMapImageDto = z.infer<typeof CreateMapImageSchema>;
