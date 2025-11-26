import { z } from "zod";
import { WindowSchema } from "../../generated/zod";

export const WindowResponseSchema = WindowSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type WindowResponse = z.infer<typeof WindowResponseSchema>;
