import { z } from "zod";

export const CreateGutterSchema = z.object({
  buildingId: z.string().uuid(),
});

export type CreateGutterDto = z.infer<typeof CreateGutterSchema>;
