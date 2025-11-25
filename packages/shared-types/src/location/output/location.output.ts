import { z } from "zod";
import { LocationSchema } from "../../generated/zod";

export const LocationResponseSchema = LocationSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type LocationResponse = z.infer<typeof LocationResponseSchema>;
