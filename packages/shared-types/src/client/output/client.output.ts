import { z } from "zod";

export const ClientBaseSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  // Fix: Allow null or make it optional, matching Prisma's Json? type
  metadata: z.any().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ClientResponseSchema = ClientBaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Client = z.infer<typeof ClientBaseSchema>;
export type ClientResponse = z.infer<typeof ClientResponseSchema>;
