import { z } from "zod";

export const UpdateBuildingSchema = z.object({
  locationId: z.string().uuid().nullable().optional(),
  name: z.string().min(1).optional(),
  isActive: z.boolean().optional(),
  facilityNumber: z.string().optional(),
  accessInformation: z.string().optional(),
  metadata: z.record(z.string(), z.any()).nullable().optional(),
});

export type UpdateBuildingDto = z.infer<typeof UpdateBuildingSchema>;
