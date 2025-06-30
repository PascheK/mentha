import { ApiResponse, ApiSuccess } from "@/types/api";

// utils/isApiSuccess.ts
export function isApiSuccess<T>(res: ApiResponse<T>): res is ApiSuccess<T> {
  return "data" in res;
}
