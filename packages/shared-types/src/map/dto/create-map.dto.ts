import { z } from "zod";

export const CreateMapSchema = z.object({
  clientId: z.string().uuid(),
  name: z.string().min(1, "Location name is required"),
  width: z.number().int().min(1, "Width must be greater than 0"),
  height: z.number().int().min(1, "Height must be greater than 0"),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateMapDto = z.infer<typeof CreateMapSchema>;
