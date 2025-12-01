import { z } from "zod";
import { ReportWorkBlockSchema } from "../../generated/zod";

export const ReportWorkBlockResponseSchema = ReportWorkBlockSchema.omit({
  createdAt: true,
  updatedAt: true,
}).strip();

export type ReportWorkBlockResponse = z.infer<typeof ReportWorkBlockResponseSchema>;
