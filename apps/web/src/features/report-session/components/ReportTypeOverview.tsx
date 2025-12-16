import type { ReportTypeAssignmentResponse } from "@aps/shared-types";
import { useReportTypeStatus } from "../session.hooks";

interface ReportTypeOverviewProps {
  reportType: ReportTypeAssignmentResponse;
}

const ReportTypeOverview = ({ reportType }: ReportTypeOverviewProps) => {
  const { type, id } = reportType;
  const { data: status } = useReportTypeStatus(id);

  const total = status?.totalBuildings ?? 0;
  const completed = status?.totalCompleted ?? 0;
  const inProgress = status?.totalInProgress ?? 0;

  const completedPct = total ? (completed / total) * 100 : 0;
  const inProgressPct = total ? (inProgress / total) * 100 : 0;

  return (
    <div className="w-[280px] p-4 rounded-lg border ">
      <div className="mb-3">
        <div className="text-sm font-semibold">
          {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
        </div>
      </div>

      <div className="space-y-2">
        {/* Top row */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {completed} completed
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              {inProgress} in progress
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary/20 flex">
          <div
            className="h-full bg-primary"
            style={{ width: `${completedPct}%` }}
          />
          <div
            className="h-full bg-amber-400"
            style={{ width: `${inProgressPct}%` }}
          />
        </div>

        {/* Optional tiny footer */}
        <div className="text-[11px] text-muted-foreground text-right">
          {completed + inProgress}/{total} started
        </div>
      </div>
    </div>
  );
};

export default ReportTypeOverview;
