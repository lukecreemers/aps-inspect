import { z } from "zod";
import { RoofSchema } from "../../generated/zod";

export const RoofResponseSchema = RoofSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type RoofResponse = z.infer<typeof RoofResponseSchema>;
