import type { ReportTypeAssignmentResponse } from "@aps/shared-types";
import { useReportTypeStatus } from "../session.hooks";
import { Progress } from "@/components/ui/progress";

interface ReportTypeOverviewProps {
  reportType: ReportTypeAssignmentResponse;
}

const ReportTypeOverview = ({ reportType }: ReportTypeOverviewProps) => {
  const { title, type, id } = reportType;
  const { data: status } = useReportTypeStatus(id);
  // Report name
  // Get Total buildings
  // Assigned
  // Completed
  // Progress Bar
  return (
    <>
      <div>{title}</div>
      <div>{type}</div>
      <div>{status?.totalBuildings}</div>
      <div>{status?.totalCompleted}</div>
      <div>{status?.totalInProgress}</div>
      <Progress value={status?.totalCompleted} max={status?.totalBuildings} />
    </>
  );
};

export default ReportTypeOverview;
