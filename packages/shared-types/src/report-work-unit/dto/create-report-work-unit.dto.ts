import { z } from "zod";

export const CreateReportWorkUnitSchema = z.object({
  // TODO: Add fields here
});

export type CreateReportWorkUnitDto = z.infer<typeof CreateReportWorkUnitSchema>;
