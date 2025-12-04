import { z } from "zod";
import { UserRoleSchema } from "../../generated/zod";

export const UserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  role: UserRoleSchema,
});

export type UserResponse = z.infer<typeof UserResponseSchema>;

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: UserResponseSchema,
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const RefreshTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type RefreshTokenResponse = z.infer<typeof RefreshTokenResponseSchema>;
