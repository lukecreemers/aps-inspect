import { z } from "zod";
import { MapSchema } from "../../generated/zod";

export const MapResponseSchema = MapSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type MapResponse = z.infer<typeof MapResponseSchema>;
