import { z } from "zod";
import { ReportBuildingSchema } from "../../generated/zod";

export const ReportBuildingResponseSchema = ReportBuildingSchema;

export type ReportBuildingResponse = z.infer<
  typeof ReportBuildingResponseSchema
>;
