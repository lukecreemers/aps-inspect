import { z } from "zod";
import { MapImageSchema } from "../../generated/zod";

export const MapImageResponseSchema = MapImageSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type MapImageResponse = z.infer<typeof MapImageResponseSchema>;
