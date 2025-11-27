import { z } from "zod";

export const CreateReportBuildingSchema = z.object({
  // TODO: Add fields here
});

export type CreateReportBuildingDto = z.infer<typeof CreateReportBuildingSchema>;
