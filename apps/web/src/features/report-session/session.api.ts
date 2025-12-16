import { request } from "@/lib/request";
import {
  organizeBuildingsLocations,
  type LocationsAndBuildingsResponse,
} from "@/utils/building.util";
import type {
  BuildingResponse,
  CreateStandardReportDto,
  LocationResponse,
  ReportResponse,
  ReportTypeAssignmentResponse,
} from "@aps/shared-types";

export const getCurrentReport = async (clientId: string) => {
  const reports = await request<ReportResponse[]>({
    method: "GET",
    url: "/reports",
    params: {
      clientId,
      status: "IN_PROGRESS",
    },
  });
  return reports[0] || null;
};

export const getLocationsAndBuildings = async (
  clientId: string
): Promise<LocationsAndBuildingsResponse> => {
  const locations = await request<LocationResponse[]>({
    method: "GET",
    url: "/locations",
    params: {
      clientId,
    },
  });
  const buildings = await request<BuildingResponse[]>({
    method: "GET",
    url: "/buildings",
    params: {
      clientId,
    },
  });

  console.log(buildings);

  const output = organizeBuildingsLocations(buildings, locations);
  console.log(output);
  return output;
};

export const createReport = async (
  data: CreateStandardReportDto
): Promise<ReportResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return await request<ReportResponse>({
    method: "POST",
    url: "reports/standard",
    data,
  });
};

export const getClientReports = async (clientId: string) => {
  return await request<ReportResponse[]>({
    method: "GET",
    url: "/reports",
    params: {
      clientId,
    },
  });
};

export const getCurrentReportTypes = async (reportId: string) => {
  return await request<ReportTypeAssignmentResponse[]>({
    method: "GET",
    url: "/report-type-assignments",
    params: {
      reportId,
    },
  });
};
