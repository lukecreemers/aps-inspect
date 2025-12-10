import { request } from "@/lib/request";
import type { ReportResponse } from "@aps/shared-types";

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
