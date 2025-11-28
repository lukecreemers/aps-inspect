import { z } from "zod";

export const CreateContractorSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  isActive: z.boolean().default(true),
});

export type CreateContractorDto = z.infer<typeof CreateContractorSchema>;
