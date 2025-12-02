import { z } from "zod";

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string | null;
  error: string | null;
  path: string;
  method: string;
  timestamp: string;
  data?: T;
  details?: unknown;
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
export * from "./report-type-assignment";
export * from "./contractor";
export * from "./report-work-unit";
export * from "./report-work-block";
export * from "./controller-pull";
export * from "./generated/zod";
