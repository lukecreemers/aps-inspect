import { z } from "zod";
import { UserRoleSchema } from "../..";

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    role: UserRoleSchema,
  }),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
