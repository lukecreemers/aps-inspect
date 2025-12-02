import { ConditionType } from "..";
import { RoofType } from "../generated/zod";

export interface RoofView {
  id: string;
  area: number;
  type: RoofType;
  condition: ConditionType;
  paintCondition: ConditionType | null;
  paintColor: string | null;
  metadata: any;
}
