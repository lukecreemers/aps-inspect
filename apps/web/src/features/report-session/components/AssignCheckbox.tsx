import { Checkbox } from "@/components/ui/checkbox";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssignCheckboxProps {
  isAssigned: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

/**
 * AssignCheckbox
 *
 * - Assignable → checkbox
 * - Assigned → locked badge (no checkbox)
 */
const AssignCheckbox = ({
  isAssigned,
  checked,
  onChange,
  className,
}: AssignCheckboxProps) => {
  if (isAssigned) {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className="flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
          <Lock className="h-3 w-3" />
          Assigned
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Checkbox
        checked={checked}
        onCheckedChange={(v) => onChange?.(v === true)}
        className={cn(
          "h-5 w-5",
          "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
          "hover:border-primary/80"
        )}
      />
    </div>
  );
};

export default AssignCheckbox;
