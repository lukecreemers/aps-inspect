export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string | null;
  error: string | null;
  path: string;
  method: string;
  timestamp: string;
  data?: T;
  details?: string;
}

export * from "./client";
