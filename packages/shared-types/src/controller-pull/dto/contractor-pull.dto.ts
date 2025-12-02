import { z } from "zod";

export const ContractorPullDtoSchema = z.object({
  loginSecretText: z.string(),
});

export type ContractorPullDto = z.infer<typeof ContractorPullDtoSchema>;
