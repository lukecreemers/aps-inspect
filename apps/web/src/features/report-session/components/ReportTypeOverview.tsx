import { useCurrentClient } from "@/features/auth/auth.hooks";
import type {
  ReportTypeAssignment,
  ReportTypeAssignmentResponse,
  ReportTypeType,
} from "@aps/shared-types";
import React from "react";

interface ReportTypeOverviewProps {
  reportType: ReportTypeAssignmentResponse;
}

const ReportTypeOverview = ({ reportType }: ReportTypeOverviewProps) => {
  const { title, type } = reportType;

  // Report name
  // Get Total buildings
  // Assigned
  // Completed
  // Progress Bar
  return (
    <>
      <div>{title}</div>
      <div>{type}</div>
    </>
  );
};

export default ReportTypeOverview;
