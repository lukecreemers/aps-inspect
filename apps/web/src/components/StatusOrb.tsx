import { cn } from "@/lib/utils";
import type { WorkUnitStatusType } from "@aps/shared-types";
import { CheckCircle2, Loader2, MinusCircle } from "lucide-react";

interface StatusOrbProps {
  status: WorkUnitStatusType;
}

const StatusOrb = ({ status }: StatusOrbProps) => {
  return (
    <span className="flex h-3 w-3 items-center justify-center">
      <span
        className={cn(
          "h-2 w-2 rounded-full ring-1 ring-inset ring-opacity-50",
          {
            "bg-primary ring-primary/30": status === "SUBMITTED",
            "bg-amber-500 ring-amber-500/30": status === "IN_PROGRESS",
            "bg-zinc-400 ring-zinc-400/30": status === "PENDING",
          }
        )}
      />
    </span>
  );
};

export default StatusOrb;
