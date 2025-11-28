import { z } from "zod";

export const CreateContractorSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^\d{7,15}$/, "Invalid phone number")
    .nullable()
    .optional(),
  isActive: z.boolean().default(true),
});

export type CreateContractorDto = z.infer<typeof CreateContractorSchema>;
