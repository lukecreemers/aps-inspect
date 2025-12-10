import { useQuery } from "@tanstack/react-query";
import * as SessionApi from "./session.api";

export const sessionKeys = {
  currentReport: (clientId: string) => ["currentReport", clientId] as const,
};

export const useCurrentReport = (clientId: string | undefined) => {
  return useQuery({
    queryKey: sessionKeys.currentReport(clientId ?? ""),
    queryFn: () => SessionApi.getCurrentReport(clientId ?? ""),
    enabled: !!clientId,
  });
};
