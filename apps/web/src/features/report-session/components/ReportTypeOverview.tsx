import type { ReportTypeAssignmentResponse } from "@aps/shared-types";
import { useReportTypeStatus } from "../session.hooks";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Timer, Layers } from "lucide-react";

interface ReportTypeOverviewProps {
  reportType: ReportTypeAssignmentResponse;
}

const ReportTypeOverview = ({ reportType }: ReportTypeOverviewProps) => {
  const { type, id } = reportType;
  const { data: status } = useReportTypeStatus(id);

  const total = status?.totalBuildings ?? 0;
  const completed = status?.totalCompleted ?? 0;
  const inProgress = status?.totalInProgress ?? 0;

  // Calculate percentages
  const completedPct = total ? (completed / total) * 100 : 0;
  const inProgressPct = total ? (inProgress / total) * 100 : 0;

  // Calculate a "remaining" segment for the visual bar
  const remainingPct = 100 - (completedPct + inProgressPct);

  return (
    <Card className="w-[280px] p-4 hover:border-border transition-colors flex flex-col gap-4">
      {/* HEADER: Title & Total */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center text-primary">
            <Layers className="h-3.5 w-3.5" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
          </span>
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          <span className="text-foreground font-bold">{total}</span> total
        </span>
      </div>

      {/* BODY: Progress Bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted flex">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${completedPct}%` }}
        />
        <div
          className="h-full bg-amber-400 transition-all duration-500"
          style={{ width: `${inProgressPct}%` }}
        />
        <div
          className="h-full bg-transparent"
          style={{ width: `${remainingPct}%` }}
        />
      </div>

      {/* FOOTER: Stats Columns (Styled like the Creds box) */}
      <div className="grid grid-cols-2 gap-2">
        {/* Completed Stat */}
        <div className="flex items-center gap-1 bg-muted/50 border pl-2 pr-2 py-1.5 rounded-md">
          <div className="flex items-center gap-1.5 border-r pr-2 mr-1">
            <CheckCircle2 className="h-3 w-3 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-muted-foreground uppercase leading-none mb-0.5">
              Done
            </span>
            <span className="text-xs font-mono font-medium text-foreground leading-none">
              {completed}
            </span>
          </div>
        </div>

        {/* In Progress Stat */}
        <div className="flex items-center gap-1 bg-muted/50 border pl-2 pr-2 py-1.5 rounded-md">
          <div className="flex items-center gap-1.5 border-r pr-2 mr-1">
            <Timer className="h-3 w-3 text-amber-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-muted-foreground uppercase leading-none mb-0.5">
              WIP
            </span>
            <span className="text-xs font-mono font-medium text-foreground leading-none">
              {inProgress}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReportTypeOverview;
