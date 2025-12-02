import { z } from "zod";
import { WorkBlockStatusSchema } from "../../generated/zod";

export const UpdateReportWorkBlockSchema = z.object({
  status: WorkBlockStatusSchema.optional(),
  contractorId: z.string().uuid().optional(),
});

export type UpdateReportWorkBlockDto = z.infer<
  typeof UpdateReportWorkBlockSchema
>;

export const AddWorkUnitsToReportWorkBlockSchema = z.object({
  workUnitIds: z.array(z.string().uuid()),
});

export type AddWorkUnitsToReportWorkBlockDto = z.infer<
  typeof AddWorkUnitsToReportWorkBlockSchema
>;

export const RemoveWorkUnitsFromReportWorkBlockSchema = z.object({
  workUnitIds: z.array(z.string().uuid()),
});

export type RemoveWorkUnitsFromReportWorkBlockDto = z.infer<
  typeof RemoveWorkUnitsFromReportWorkBlockSchema
>;
