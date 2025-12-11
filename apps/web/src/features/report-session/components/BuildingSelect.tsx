import { Checkbox } from "@/components/ui/checkbox";
import type { BuildingResponse } from "@aps/shared-types";
import { cn } from "@/lib/utils";
import { Building2 } from "lucide-react";

interface BuildingSelectProps {
  building: BuildingResponse;
  isChecked: boolean;
  onSelect?: (buildingId: string) => void;
  className?: string;
}

const BuildingSelect = ({
  building,
  className,
  isChecked,
}: BuildingSelectProps) => {
  return (
    <label
      htmlFor={building.id}
      className={cn(
        "flex items-center gap-4 py-3 px-4 hover:bg-muted/50 transition-colors cursor-pointer",
        className
      )}
    >
      <Checkbox id={building.id} checked={isChecked} />
      <Building2 className="h-4 w-4 text-muted-foreground" />
      <span className="flex-1 font-normal text-sm text-foreground">
        {building.name}
      </span>
    </label>
  );
};

export default BuildingSelect;
