import { z } from "zod";

export const QueryClientSchema = z.object({
  search: z.string().optional(),
  take: z.string().transform(Number).optional(),
  skip: z.string().transform(Number).optional(),
});

export type QueryClientDto = z.infer<typeof QueryClientSchema>;
