import { useMutation, useQuery } from "@tanstack/react-query";
import * as SessionApi from "./session.api";
import { useCurrentClient } from "../auth/auth.hooks";

export const sessionKeys = {
  currentReport: (clientId: string) => ["currentReport", clientId] as const,
  clientReports: (clientId: string) => ["clientReports", clientId] as const,
  currentBuildings: (clientId: string) =>
    ["currentBuildings", clientId] as const,
  currentReportTypes: (reportId: string) =>
    ["currentReportTypes", reportId] as const,
  reportTypeStatus: (reportTypeId: string) =>
    ["reportTypeStatus", reportTypeId] as const,
  reportStatus: (reportTypeId: string) =>
    ["reportStatus", reportTypeId] as const,
  reportTypes: (reportId: string) => ["reportTypes", reportId] as const,
  reportWorkBlocks: (reportId: string) =>
    ["reportWorkBlocks", reportId] as const,
  contractors: () => ["contractors"] as const,
};

export const useCurrentReport = (clientId: string | undefined) => {
  return useQuery({
    queryKey: sessionKeys.currentReport(clientId ?? ""),
    queryFn: () => SessionApi.getCurrentReport(clientId ?? ""),
    enabled: !!clientId,
  });
};

export const useCurrentBuildings = (clientId: string | undefined) => {
  return useQuery({
    queryKey: sessionKeys.currentBuildings(clientId ?? ""),
    queryFn: () => SessionApi.getLocationsAndBuildings(clientId ?? ""),
    enabled: !!clientId,
  });
};

export const useCreateReport = () => {
  return useMutation({
    mutationFn: SessionApi.createReport,
  });
};

export const useClientReports = (clientId: string | undefined) => {
  return useQuery({
    queryKey: sessionKeys.clientReports(clientId ?? ""),
    queryFn: () => SessionApi.getClientReports(clientId ?? ""),
    enabled: !!clientId,
  });
};

export const useCurrentReportTypes = (reportId: string | undefined) => {
  return useQuery({
    queryKey: sessionKeys.currentReportTypes(reportId ?? ""),
    queryFn: () => SessionApi.getCurrentReportTypes(reportId ?? ""),
    enabled: !!reportId,
  });
};

export const useCurrentReportTypesAuto = () => {
  const currentClient = useCurrentClient();
  const { data: currentReport } = useCurrentReport(currentClient?.id);
  const { data: currentReportTypes } = useCurrentReportTypes(currentReport?.id);
  return !currentReportTypes ? [] : currentReportTypes;
};

export const useReportTypeStatus = (reportTypeId: string | undefined) => {
  return useQuery({
    queryKey: sessionKeys.reportTypeStatus(reportTypeId ?? ""),
    queryFn: () => SessionApi.getReportTypeStatus(reportTypeId ?? ""),
    enabled: !!reportTypeId,
  });
};

export const useReportStatus = (reportTypeId: string | undefined) => {
  return useQuery({
    queryKey: sessionKeys.reportStatus(reportTypeId ?? ""),
    queryFn: () => SessionApi.getReportStatus(reportTypeId ?? ""),
    enabled: !!reportTypeId,
  });
};

export const useReportTypes = (reportId: string | undefined) => {
  return useQuery({
    queryKey: sessionKeys.reportTypes(reportId ?? ""),
    queryFn: () => SessionApi.getReportTypes(reportId ?? ""),
    enabled: !!reportId,
  });
};

export const useReportWorkBlocks = (reportId: string | undefined) => {
  return useQuery({
    queryKey: sessionKeys.reportWorkBlocks(reportId ?? ""),
    queryFn: () => SessionApi.getReportWorkBlocks(reportId ?? ""),
    enabled: !!reportId,
  });
};

export const useContractors = () => {
  return useQuery({
    queryKey: sessionKeys.contractors(),
    queryFn: () => SessionApi.getContractors(),
  });
};
