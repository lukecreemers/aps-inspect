import { z } from "zod";
import { EmailTemplateSchema } from "../..";

export const EmailReportWorkBlockSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(1),
  template: EmailTemplateSchema,
  contractorId: z.string().uuid(),
  buildings: z.array(z.string().uuid()),
  secretText: z.string(),
});

export type EmailReportWorkBlockDto = z.infer<
  typeof EmailReportWorkBlockSchema
>;
