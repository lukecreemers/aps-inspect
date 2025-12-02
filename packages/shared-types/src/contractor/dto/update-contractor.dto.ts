import { z } from "zod";

export const UpdateContractorSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z
    .string()
    .regex(/^\d{7,15}$/, "Invalid phone number")
    .nullable()
    .optional(),
  isActive: z.boolean().optional(),
});

export type UpdateContractorDto = z.infer<typeof UpdateContractorSchema>;
