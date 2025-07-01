import { ApiSuccess, ApiError } from "@/types/api";

export const successResponse = <T>(data: T, message?: string): ApiSuccess<T> => ({
  success: true,
  data,
  message,
});

export const errorResponse = (code: number, message: string, details?: unknown): ApiError => ({
  success: false,
  error: {
    code,
    message,
    details,
  },
});
