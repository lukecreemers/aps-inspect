import { z } from "zod";

export const UpdateReportBuildingSchema = z.object({
  // TODO: Add fields here
});

export type UpdateReportBuildingDto = z.infer<typeof UpdateReportBuildingSchema>;
