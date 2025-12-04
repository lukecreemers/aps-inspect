// request.ts
import { api } from "./apiClient";
import type { ApiResponse } from "@aps/shared-types";
import { isAxiosError } from "axios";

export async function request<T>(
  ...args: Parameters<typeof api.request>
): Promise<T> {
  try {
    const res = await api.request<ApiResponse<T>>(...args);

    if (!res.data.success) {
      if (import.meta.env.DEV) {
        console.group("API Error (Logical)");
        console.error("Endpoint:", args[0].url);
        console.error("Error:", res.data.error);
        console.error("Details:", res.data.details);
        console.groupEnd();
      }
      throw new Error(res.data.error ?? "API error");
    }

    return res.data.data as T;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      if (import.meta.env.DEV) {
        console.group("API Error (HTTP)");
        console.error("Status:", error.response.status);
        console.error("Endpoint:", args[0].url);
        console.error("Response Data:", error.response.data);
        console.groupEnd();
      }
      // If the server returned a structured error, try to use its message
      const data = error.response.data as ApiResponse<unknown>;
      if (data && data.error) {
        throw new Error(data.error);
      }
    }
    throw error;
  }
}
