import { z } from "zod";
import { BuildingSchema } from "../../generated/zod";

export const CreateBuildingSchema = z.object({
  clientId: z.string().uuid(),
  locationId: z.string().uuid().optional(),
  name: z.string().min(1, "Building name is required"),
  isActive: z.boolean().default(true),
  facilityNumber: z.string().optional(),
  accessInformation: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateBuildingDto = z.infer<typeof CreateBuildingSchema>;
