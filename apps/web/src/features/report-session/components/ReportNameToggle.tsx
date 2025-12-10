import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ReportNameToggleProps {
  title: string;
  initValue: string;
  value: string;
  type: string;
  onChange: (value: string) => void;
}

export function ReportNameToggle({
  title,
  initValue,
  value,
  type,
  onChange,
}: ReportNameToggleProps) {
  const [enabled, setEnabled] = useState(true);

  return (
    <div
      className={cn(
        "rounded-lg p-4 space-y-3 cursor-pointer border",
        enabled &&
          "bg-accent border-accent-foreground border-2 text-accent-foreground"
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
            setEnabled(isChecked);
            if (isChecked) {
              onChange(initValue + " - " + type);
            }
          }}
        />
        <span>{title}</span>
      </label>

      {/* Conditional input */}
      {enabled && (
        <div className="">
          <label className="text-sm text-muted-foreground block mb-1">
            Generated Report Name
          </label>
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onClick={(e) => e.stopPropagation()} // prevents re-toggle
          />
        </div>
      )}
    </div>
  );
}
