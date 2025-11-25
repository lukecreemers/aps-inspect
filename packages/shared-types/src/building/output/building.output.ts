import { z } from "zod";
import { BuildingSchema } from "../../generated/zod";

export const BuildingResponseSchema = BuildingSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type BuildingResponse = z.infer<typeof BuildingResponseSchema>;
