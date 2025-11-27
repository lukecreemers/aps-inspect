import { z } from "zod";
import { ReportBuildingSchema } from "../../generated/zod";

export const ReportBuildingResponseSchema = ReportBuildingSchema.omit({
  createdAt: true,
  updatedAt: true,
}).strip();

export type ReportBuildingResponse = z.infer<typeof ReportBuildingResponseSchema>;
