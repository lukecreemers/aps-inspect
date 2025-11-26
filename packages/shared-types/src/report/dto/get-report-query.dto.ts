import { z } from "zod";
import { ReportStatusSchema } from "../../generated/zod";

export const GetReportsQuerySchema = z.object({
  type: z.enum(["standard", "system"]).optional(),
  status: ReportStatusSchema.optional(),
  clientId: z.string().uuid().optional(),
  take: z.number().min(1).max(100).optional(),
  skip: z.number().min(0).optional(),
});

export type GetReportsQueryDto = z.infer<typeof GetReportsQuerySchema>;
