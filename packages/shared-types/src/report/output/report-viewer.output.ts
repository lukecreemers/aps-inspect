import { z } from "zod";
import { ReportSchema } from "../../generated/zod";
import { BuildingResponseSchema } from "../../client";
import { ReportWorkUnitResponseSchema } from "../../report-work-unit";
import { ContractorResponseSchema } from "../../contractor";
import { LocationResponseSchema } from "../../location";

const ViewerWorkUnitSchema = ReportWorkUnitResponseSchema.extend({
  contractor: ContractorResponseSchema.optional(),
  issueCount: z.number(),
});

const ViewerBuildingSchema = BuildingResponseSchema.extend({
  workUnits: z.array(ViewerWorkUnitSchema),
});

const ViewerLocationSchema = LocationResponseSchema.extend({
  buildings: z.array(ViewerBuildingSchema),
});

export const ReportViewerOutputSchema = ReportSchema.extend({
  locations: z.array(ViewerLocationSchema),
  unattachedBuildings: z.array(ViewerBuildingSchema),
});

export type ReportViewerOutput = z.infer<typeof ReportViewerOutputSchema>;
