import { z } from "zod";
import { ReportSchema } from "../../generated/zod";
import { BuildingResponseSchema } from "../../client";
import { ReportWorkUnitResponseSchema } from "../../report-work-unit";
import { ContractorResponseSchema } from "../../contractor";
import { LocationResponseSchema } from "../../location";

export const ViewerWorkUnitSchema = ReportWorkUnitResponseSchema.extend({
  contractor: ContractorResponseSchema.optional(),
  issueCount: z.number(),
});

export type ViewerWorkUnit = z.infer<typeof ViewerWorkUnitSchema>;

export const ViewerBuildingSchema = BuildingResponseSchema.extend({
  workUnits: z.array(ViewerWorkUnitSchema),
});

export type ViewerBuilding = z.infer<typeof ViewerBuildingSchema>;

export const ViewerLocationSchema = LocationResponseSchema.extend({
  buildings: z.array(ViewerBuildingSchema),
});

export type ViewerLocation = z.infer<typeof ViewerLocationSchema>;

export const ReportViewerOutputSchema = ReportSchema.extend({
  locations: z.array(ViewerLocationSchema),
  unattachedBuildings: z.array(ViewerBuildingSchema),
});

export type ReportViewerOutput = z.infer<typeof ReportViewerOutputSchema>;
