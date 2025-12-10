import { useQuery } from "@tanstack/react-query";
import * as SessionApi from "./session.api";

export const sessionKeys = {
  currentReport: (clientId: string) => ["currentReport", clientId] as const,
  currentBuildings: (clientId: string) =>
    ["currentBuildings", clientId] as const,
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
