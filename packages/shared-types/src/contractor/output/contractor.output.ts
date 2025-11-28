import { z } from "zod";
import { ContractorSchema } from "../../generated/zod";

export const ContractorResponseSchema = ContractorSchema.omit({
  createdAt: true,
  updatedAt: true,
}).strip();

export type ContractorResponse = z.infer<typeof ContractorResponseSchema>;
