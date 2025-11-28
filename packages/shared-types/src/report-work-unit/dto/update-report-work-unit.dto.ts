import { z } from "zod";

export const UpdateReportWorkUnitSchema = z.object({
  // TODO: Add fields here
});

export type UpdateReportWorkUnitDto = z.infer<typeof UpdateReportWorkUnitSchema>;
