import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface StateBadgeProps {
  state: "IN_PROGRESS" | "COMPLETED";
}

const stateConfig = {
  IN_PROGRESS: {
    label: "In progress",
    icon: Clock,
    className:
      "border-blue-200 text-blue-700 bg-blue-50 dark:border-blue-900 dark:bg-blue-950",
  },
  COMPLETED: {
    label: "Completed",
    icon: CheckCircle,
    className:
      "border-green-200 text-green-700 bg-green-50 dark:border-green-900 dark:bg-green-950",
  },
} as const;

const StateBadge: React.FC<StateBadgeProps> = ({ state }) => {
  const config = stateConfig[state];
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(
        "flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium",
        config.className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </Badge>
  );
};

export default StateBadge;
