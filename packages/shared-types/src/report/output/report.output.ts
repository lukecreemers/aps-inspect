import { z } from "zod";
import { ReportSchema } from "../../generated/zod";

export const ReportResponseSchema = ReportSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type ReportResponse = z.infer<typeof ReportResponseSchema>;
