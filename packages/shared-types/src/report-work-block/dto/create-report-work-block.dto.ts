import { z } from "zod";

export const CreateReportWorkBlockSchema = z.object({
  reportId: z.string().uuid(),
  contractorId: z.string().uuid(),
});

export type CreateReportWorkBlockDto = z.infer<
  typeof CreateReportWorkBlockSchema
>;
