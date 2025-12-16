import { z } from "zod";
import {
  ReportSchema,
  ReportStatusSchema,
  ReportTypeSchema,
  WorkUnitStatusSchema,
} from "../../generated/zod";
import { BuildingBundleSchema } from "../../controller-pull";
import { LocationResponseSchema } from "../../location";
import { BuildingResponseSchema } from "../../client";

export const ReportResponseSchema = ReportSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type ReportResponse = z.infer<typeof ReportResponseSchema>;

export const ReportStatusTypeStatusSchema = z.object({
  type: ReportTypeSchema,
  status: WorkUnitStatusSchema,
});

export type ReportStatusTypeStatus = z.infer<
  typeof ReportStatusTypeStatusSchema
>;

export const ReportStatusBuildingViewSchema = z.object({
  building: BuildingResponseSchema,
  types: z.array(ReportStatusTypeStatusSchema),
});

export type ReportStatusBuildingView = z.infer<
  typeof ReportStatusBuildingViewSchema
>;

export const ReportStatusLocationViewSchema = z.object({
  location: LocationResponseSchema,
  buildings: z.array(ReportStatusBuildingViewSchema),
});

export type ReportStatusLocationView = z.infer<
  typeof ReportStatusLocationViewSchema
>;

export const ReportStatusResponseSchema = z.object({
  locations: z.array(ReportStatusLocationViewSchema),
  unattachedBuildings: z.array(ReportStatusBuildingViewSchema),
});

export type ReportStatusResponse = z.infer<typeof ReportStatusResponseSchema>;
