import { z } from "zod";
import { ClientSchema } from "../../generated/zod";

export const ClientResponseSchema = ClientSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type Client = z.infer<typeof ClientSchema>;
export type ClientResponse = z.infer<typeof ClientResponseSchema>;
