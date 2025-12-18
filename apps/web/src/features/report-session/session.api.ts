import { request } from "@/lib/request";
import {
  organizeBuildingsLocations,
  type LocationsAndBuildingsResponse,
} from "@/utils/building.util";
import {
  type ReportTypeStatusResponse,
  type BuildingResponse,
  type CreateStandardReportDto,
  type LocationResponse,
  type ReportResponse,
  type ReportTypeAssignmentResponse,
  type ReportStatusResponse,
  type ReportWorkBlockResponse,
  type ReportWorkBlockOverviewResponse,
  type ContractorResponse,
  type CreateReportWorkBlockDto,
  type EmailReportWorkBlockDto,
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

export const getReportTypeStatus = async (reportTypeId: string) => {
  return await request<ReportTypeStatusResponse>({
    method: "GET",
    url: `/report-type-assignments/status/${reportTypeId}`,
  });
};

export const getReportStatus = async (reportId: string) => {
  return await request<ReportStatusResponse>({
    method: "GET",
    url: `/reports/${reportId}/status`,
  });
};

export const getReportTypes = async (reportId: string) => {
  return await request<ReportTypeAssignmentResponse[]>({
    method: "GET",
    url: `/report-type-assignments`,
    params: {
      reportId,
    },
  });
};

export const getReportWorkBlocks = async (reportId: string) => {
  return await request<ReportWorkBlockOverviewResponse[]>({
    method: "GET",
    url: `/report-work-blocks/${reportId}/overview`,
  });
};

export const getContractors = async () => {
  return await request<ContractorResponse[]>({
    method: "GET",
    url: "/contractors",
  });
};

export const createWorkBlock = async (dto: CreateReportWorkBlockDto) => {
  return await request<ReportWorkBlockResponse>({
    method: "POST",
    url: "/report-work-blocks",
    data: dto,
  });
};

export const deleteWorkBlock = async (workBlockId: string) => {
  return await request<void>({
    method: "DELETE",
    url: `/report-work-blocks/${workBlockId}`,
  });
};

export const regenerateSecretText = async (workBlockId: string) => {
  return await request<ReportWorkBlockResponse>({
    method: "PATCH",
    url: `/report-work-blocks/${workBlockId}/regenerate-secret-text`,
  });
};

export const emailCredentials = async (
  dto: EmailReportWorkBlockDto & { workBlockId: string }
) => {
  return await request<void>({
    method: "POST",
    url: `/report-work-blocks/${dto.workBlockId}/email-credentials`,
    data: dto,
  });
};
