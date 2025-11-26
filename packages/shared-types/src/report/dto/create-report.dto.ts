import { z } from "zod";
import { ReportTypeSchema } from "../../generated/zod";

export const CreateSystemReportSchema = z.object({
  clientId: z.string().uuid(),
});

export type CreateSystemReportDto = z.infer<typeof CreateSystemReportSchema>;

export const CreateStandardReportSchema = z.object({
  clientId: z.string().uuid(),
  title: z.string().min(1, "Report title is required"),
  buildingIds: z
    .array(z.string().uuid())
    .min(1, "At least one building is required"),
  reportTypes: z
    .array(ReportTypeSchema)
    .min(1, "At least one report type is required"),
});

export type CreateStandardReportDto = z.infer<
  typeof CreateStandardReportSchema
>;
