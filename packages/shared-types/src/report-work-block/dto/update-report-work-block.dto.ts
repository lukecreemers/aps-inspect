import { z } from "zod";

export const UpdateReportWorkBlockSchema = z.object({
  // TODO: Add fields here
});

export type UpdateReportWorkBlockDto = z.infer<typeof UpdateReportWorkBlockSchema>;
