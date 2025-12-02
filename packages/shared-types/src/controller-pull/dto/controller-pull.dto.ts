import { z } from "zod";

export const ControllerPullSchema = z.object({
  loginSecretText: z.string(),
});

export type ControllerPullDto = z.infer<typeof ControllerPullSchema>;
