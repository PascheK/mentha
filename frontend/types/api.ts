// types/api.ts

export interface ApiError {
  message: string;
  code?: number;
  error?: unknown;
}

export interface ApiSuccess<T> {
  data: T;
  message?: string;
}

export type ApiResponse<T> = ApiSuccess<T> | { error: ApiError };
