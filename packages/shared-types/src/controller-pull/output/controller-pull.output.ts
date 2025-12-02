import { z } from "zod";
import { RoofTypeSchema } from "../../generated/zod";

// ------------------------------
// Base Views
// ------------------------------

export const LocationViewSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string().nullable(),
});

export const BuildingViewSchema = z.object({
  id: z.string(),
  name: z.string(),
  facilityNumber: z.string().nullable(),
  accessInformation: z.string().nullable(),
  metadata: z.any().optional(),
});

export const RoofViewSchema = z.object({
  id: z.string(),
  area: z.number().nullable(),
  type: RoofTypeSchema.nullable(),
  condition: z.number(),
  paintCondition: z.number().nullable(),
  paintColor: z.string().nullable(),
});

export type RoofView = z.infer<typeof RoofViewSchema>;

// export const GutterViewSchema = z.object({
//   id: z.string(),
//   type: z.string().nullable(),
//   condition: z.number().nullable(),
//   length: z.number().nullable(),
// });

// A building's roof bundle
export const RoofBundleSchema = z.object({
  roofs: z.array(RoofViewSchema),
  // gutters: z.array(GutterViewSchema),
  // issues: z.array(IssueViewSchema),
});

export type RoofBundle = z.infer<typeof RoofBundleSchema>;

// ------------------------------
// Exterior Data
// ------------------------------

// export const SubstrateViewSchema = z.object({
//   id: z.string(),
//   type: z.string().nullable(),
//   condition: z.number().nullable(),
// });

// export const WindowViewSchema = z.object({
//   id: z.string(),
//   type: z.string().nullable(),
//   condition: z.number().nullable(),
// });

// // A building's exterior bundle
// export const ExteriorBundleSchema = z.object({
//   substrates: z.array(SubstrateViewSchema),
//   windows: z.array(WindowViewSchema),
//   issues: z.array(IssueViewSchema),
// });

// ------------------------------
// FINAL Building Bundle
// ------------------------------

export const BuildingBundleSchema = z.object({
  building: BuildingViewSchema,
  location: LocationViewSchema.nullable(),

  roof: RoofBundleSchema.optional(),
  // exterior: ExteriorBundleSchema.optional(),
});

export type BuildingBundle = z.infer<typeof BuildingBundleSchema>;

// ------------------------------
// TOP-LEVEL RESPONSE
// ------------------------------

export const ContractorPullResponseSchema = z.object({
  syncToken: z.string(),

  locations: z.array(LocationViewSchema).optional().default([]),
  buildings: z.array(BuildingBundleSchema),
});

export type ContractorPullResponse = z.infer<
  typeof ContractorPullResponseSchema
>;
