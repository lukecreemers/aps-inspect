import { z } from "zod";

export const EmailReportWorkBlockSchema = z.object({
  contractorId: z.string().uuid(),
  buildings: z.array(z.string().uuid()),
});

export type EmailReportWorkBlockDto = z.infer<
  typeof EmailReportWorkBlockSchema
>;
