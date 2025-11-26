import { z } from "zod";

export const CreateRoofSchema = z.object({
  buildingId: z.string().uuid(),
});

export type CreateRoofDto = z.infer<typeof CreateRoofSchema>;
