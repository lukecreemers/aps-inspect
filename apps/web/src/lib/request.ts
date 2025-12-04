// request.ts
import { api } from "./apiClient";
import type { ApiResponse } from "@aps/shared-types";

export async function request<T>(
  ...args: Parameters<typeof api.request>
): Promise<T> {
  const res = await api.request<ApiResponse<T>>(...args);

  if (!res.data.success) {
    throw new Error(res.data.error ?? "API error");
  }

  return res.data.data as T;
}
