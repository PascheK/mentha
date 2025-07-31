// src/lib/site/api.ts
import { ApiResponse } from "@/types/api";
import { Site } from "@/types/site";
import Cookies from "js-cookie";
const API_URL = process.env.NODE_ENV === "production"
  ? process.env.NEXT_PUBLIC_API_URL || "https://api.m3ntha.ch"
  : process.env.NEXT_PUBLIC_API_URL_DEV || "http://localhost:5000";
const token = Cookies.get("token");

// Récupérer tous les sites de l’utilisateur
export const getSites = async (): Promise<ApiResponse<Site[]>> => {
  if (!token)
    return {
      success: false,
      error: { code: 401, message: "No token found" },
    };

  try {
    const res = await fetch(`${API_URL}/api/sites`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return {
        success: false,
        error: {
          code: res.status,
          message: data?.error?.message || "Failed to fetch sites",
        },
      };
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (err: unknown) {
    const error = err as Error;
    return {
      success: false,
      error: {
        code: 500,
        message: error.message || "Internal error",
      },
    };
  }
};
interface CreateSiteInput {
  name: string;
  slug: string;
}

export const createSite = async (
  input: CreateSiteInput
): Promise<ApiResponse<Site>> => {
  if (!token)
    return {
      success: false,
      error: { code: 401, message: "No token found" },
    };

  try {
    const res = await fetch(`${API_URL}/api/sites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return {
        success: false,
        error: {
          code: res.status,
          message: data?.error?.message || "Failed to create site",
        },
      };
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (err: unknown) {
    const error = err as Error;
    return {
      success: false,
      error: {
        code: 500,
        message: error.message || "Internal error",
      },
    };
  }
};

export const deleteSite = async (
  siteId: string
): Promise<ApiResponse<string>> => {
  const token = Cookies.get("token");
  if (!token) {
    return {
      success: false,
      error: { code: 401, message: "No token found" },
    };
  }

  try {
    const res = await fetch(`${API_URL}/api/sites/${siteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return {
        success: false,
        error: {
          code: res.status,
          message: data?.error?.message || "Failed to delete site",
        },
      };
    }

    return {
      success: true,
      data: data.message || "Site deleted",
    };
  } catch (err: unknown) {
    const error = err as Error;
    return {
      success: false,
      error: {
        code: 500,
        message: error.message || "Internal error",
      },
    };
  }
};

export const getSiteById = async (
  siteId: string
): Promise<ApiResponse<Site>> => {
  const token = Cookies.get("token");
  if (!token) {
    return {
      success: false,
      error: { code: 401, message: "No token found" },
    };
  }

  try {
    const res = await fetch(`${API_URL}/api/sites/${siteId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return {
        success: false,
        error: {
          code: res.status,
          message: data?.error?.message || "Failed to fetch site",
        },
      };
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (err: unknown) {
    const error = err as Error;
    return {
      success: false,
      error: {
        code: 500,
        message: error.message || "Internal error",
      },
    };
  }
};
export const updateSite = async (
  siteId: string,
  data: Partial<Site>
): Promise<ApiResponse<Site>> => {
  const token = Cookies.get("token");
  if (!token) {
    return {
      success: false,
      error: { code: 401, message: "No token found" },
    };
  }

  try {
    const res = await fetch(`${API_URL}/api/sites/${siteId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (!res.ok || !resData.success) {
      return {
        success: false,
        error: {
          code: res.status,
          message: resData?.error?.message || "Failed to update site",
        },
      };
    }

    return {
      success: true,
      data: resData.data,
    };
  } catch (err: unknown) {
    const error = err as Error;
    return {
      success: false,
      error: {
        code: 500,
        message: error.message || "Internal error",
      },
    };
  }
};
