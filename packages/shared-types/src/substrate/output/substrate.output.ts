import { z } from "zod";
import { SubstrateSchema } from "../../generated/zod";

export const SubstrateResponseSchema = SubstrateSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type SubstrateResponse = z.infer<typeof SubstrateResponseSchema>;
