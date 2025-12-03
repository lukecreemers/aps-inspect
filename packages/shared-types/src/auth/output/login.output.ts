import { z } from "zod";
import { UserRoleSchema } from "../..";

export const UserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  role: UserRoleSchema,
});

export type UserResponse = z.infer<typeof UserResponseSchema>;

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  user: UserResponseSchema,
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
