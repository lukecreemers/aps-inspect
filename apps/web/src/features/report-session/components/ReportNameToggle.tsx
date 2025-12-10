import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ReportNameToggleProps {
  title: string;
  initValue: string;
  value: string;
  type: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  onChange: (value: string) => void;
}

export function ReportNameToggle({
  title,
  initValue,
  value,
  type,
  enabled,
  onToggle,
  onChange,
}: ReportNameToggleProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-4 space-y-3 cursor-pointer border",
        enabled &&
          "bg-accent/60 border-accent-foreground border-2 text-accent-foreground"
      )}
    >
      {/* Clickable header */}
      <label
        className={cn(
          "flex items-center gap-3 cursor-pointer select-none text-sm",
          enabled && "font-medium"
        )}
      >
        <Checkbox
          checked={enabled}
          onCheckedChange={(v) => {
            const isChecked = Boolean(v);
            onToggle(isChecked);
            if (isChecked && !value) {
              onChange(initValue + " - " + type);
            }
          }}
        />
        <span>{title}</span>
      </label>

      {/* Conditional input */}
      {enabled && (
        <div className="">
          <label
            className="text-sm text-muted-foreground block mb-1"
            htmlFor={type}
          >
            Generated Report Name
          </label>
          <Input
            id={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onClick={(e) => e.stopPropagation()} // prevents re-toggle
            className="bg-background text-foreground"
          />
        </div>
      )}
    </div>
  );
}
