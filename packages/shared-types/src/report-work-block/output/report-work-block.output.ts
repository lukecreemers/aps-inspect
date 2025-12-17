import { z } from "zod";
import { ReportTypeSchema, ReportWorkBlockSchema } from "../../generated/zod";

export const ReportWorkBlockResponseSchema = ReportWorkBlockSchema;

export type ReportWorkBlockResponse = z.infer<
  typeof ReportWorkBlockResponseSchema
>;

export const ReportWorkBlockOverviewResponseSchema =
  ReportWorkBlockSchema.extend({
    buildingCount: z.number(),
    contractorName: z.string(),
    types: z.array(ReportTypeSchema),
  });

export type ReportWorkBlockOverviewResponse = z.infer<
  typeof ReportWorkBlockOverviewResponseSchema
>;
