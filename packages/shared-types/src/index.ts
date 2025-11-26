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
export * from "./building";
export * from "./location";
export * from "./roof";
export * from "./gutter";
export * from "./substrate";
export * from "./window";
export * from "./map";
export * from "./map-image";
export * from "./report";
export * from "./generated/zod";
