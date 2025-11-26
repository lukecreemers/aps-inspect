import { z } from "zod";

export const CreateWindowSchema = z.object({
  buildingId: z.string().uuid(),
});

export type CreateWindowDto = z.infer<typeof CreateWindowSchema>;
