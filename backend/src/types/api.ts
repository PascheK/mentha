// src/types/api.ts

export type ApiSuccess<T> = {
  success: true;
  data: T;
  message?: string;
  meta?: Record<string, any>;
};

export type ApiError = {
  success: false;
  error: {
    code: number;
    message: string;
    details?: any;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
