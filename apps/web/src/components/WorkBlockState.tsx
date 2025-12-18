import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import type { WorkBlockStatusType } from "@aps/shared-types";

interface WorkBlockStateProps {
  state: WorkBlockStatusType;
}

const formattedState = (state: WorkBlockStatusType) => {
  switch (state) {
    case "ASSIGNED":
      return "ASSIGNED";
    case "IN_PROGRESS":
      return "IN PROGRESS";
    case "SUBMITTED":
      return "SUBMITTED";
  }
};

const WorkBlockState = ({ state }: WorkBlockStateProps) => {
  return (
    <Badge
      className={cn(
        "rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide border",
        state === "ASSIGNED" &&
          "bg-card text-foreground border-border shadow-sm",
        state === "IN_PROGRESS" &&
          "bg-amber-500/10 text-amber-500 border-amber-500 shadow-sm"
      )}
    >
      {formattedState(state)}
    </Badge>
  );
};

export default WorkBlockState;
