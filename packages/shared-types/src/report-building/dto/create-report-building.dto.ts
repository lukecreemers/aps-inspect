import { z } from "zod";

export const CreateReportBuildingSchema = z.object({
  reportId: z.string().uuid(),
  buildingId: z.string().uuid(),
});

export type CreateReportBuildingDto = z.infer<
  typeof CreateReportBuildingSchema
>;
