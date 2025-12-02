import { z } from "zod";
import { BuildingResponseSchema } from "../../building";
import { LocationResponseSchema } from "../../location";
import { RoofResponseSchema } from "../../roof";
import { GutterResponseSchema } from "../../gutter";
import { SubstrateResponseSchema } from "../../substrate";
import { WindowResponseSchema } from "../../window";

export const ControllerPullResponseSchema = z.object({
  syncToken: z.string(),
  buildings: BuildingResponseSchema.array(),
  locations: LocationResponseSchema.array(),

  roofs: RoofResponseSchema.array(),
  gutters: GutterResponseSchema.array(),
  substrates: SubstrateResponseSchema.array(),
  windows: WindowResponseSchema.array(),
});

export type ControllerPullResponse = z.infer<
  typeof ControllerPullResponseSchema
>;
