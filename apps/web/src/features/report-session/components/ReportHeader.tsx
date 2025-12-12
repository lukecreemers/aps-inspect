import { Card } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { Badge } from "lucide-react";
import React from "react";
import { useCurrentReport } from "../session.hooks";
import { useCurrentClient } from "@/features/auth/auth.hooks";
import StateBadge from "@/components/StateBadge";

const ReportHeader = () => {
  const client = useCurrentClient();
  const { data: currentReport } = useCurrentReport(client?.id);

  return (
    <div className="flex flex-col gap-1">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">{currentReport?.title}</h1>
        <StateBadge state="IN_PROGRESS" />
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>{client?.name}</span>
      </div>
    </div>
  );
};

export default ReportHeader;
