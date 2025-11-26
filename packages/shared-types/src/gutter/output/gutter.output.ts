import { z } from "zod";
import { GutterSchema } from "../../generated/zod";

export const GutterResponseSchema = GutterSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type GutterResponse = z.infer<typeof GutterResponseSchema>;
