import Cookies from "js-cookie";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";

const API_URL = process.env.NODE_ENV === "production"
  ? process.env.NEXT_PUBLIC_API_URL || "https://api.m3ntha.ch"
  : process.env.NEXT_PUBLIC_API_URL_DEV || "http://localhost:5000";
// Login
export const loginUser = async (
  email: string,
  password: string,
  staySignedIn: boolean
): Promise<ApiResponse<string>> => {
  try {
    
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return {
        success: false,
        error: {
          code: res.status,
          message: data?.error?.message || "Login failed",
        },
      };
    }
    Cookies.set("token", data.data.token, staySignedIn ? { expires: 7 } : undefined);
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
        message: error.message || "Login exception",
      },
    };
  }
};

// Register
export const registerUser = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  photo: string,
  termsAccepted: boolean,
  phoneNumber?: string,
  newsletterSubscribed?: boolean,
  billingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    postalCode: string;
    country: string;
  }
): Promise<ApiResponse<string>> => {
  try {
       

    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        email,
        password,
        photo,
        termsAccepted,
        phoneNumber,
        newsletterSubscribed,
        billingAddress,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return {
        success: false,
        error: {
          code: res.status,
          message: data?.error?.message || "Registration failed",
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

// Me
export const fetchCurrentUser = async (): Promise<ApiResponse<User>> => {
  const token = Cookies.get("token");
  if (!token)
    return {
      success: false,
      error: { code: 401, message: "No token found" },
    };

  try {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return {
        success: false,
        error: {
          code: res.status,
          message: data?.error?.message || "Could not fetch user",
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

// Verify Email
export const verifyEmail = async (
  token: string
): Promise<ApiResponse<string>> => {
  try {
    const res = await fetch(`${API_URL}/api/auth/verify-email/${token}`);
    const data = await res.json();

    if (!res.ok || !data.success) {
      return {
        success: false,
        error: {
          code: res.status,
          message: data?.error?.message || "Invalid token",
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

// Logout
export const logoutUser = () => {
  Cookies.remove("token");
};

// Forgot Password
export const forgotPassword = async (
  email: string
): Promise<ApiResponse<void>> => {
  try {
    const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return {
        success: false,
        error: {
          code: res.status,
          message: data?.error?.message || "Forgot password failed",
        },
      };
    }

    return {
      success: true,
      data: undefined,
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
}

export const resetPassword =  async (
  token : string,
  newPassword: string
): Promise<ApiResponse<string>> => {
  try {
    const res = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return {
        success: false,
        error: {
          code: res.status,
          message: data?.error?.message || "Reset password failed",
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
}

export const updateUser = async (
  userData: Partial<User>
): Promise<ApiResponse<string>> => {
  const token = Cookies.get("token");
  if (!token) {
    return {
      success: false,
      error: { code: 401, message: "No token found" },
    };
  }

  try {
    const res = await fetch(`${API_URL}/api/auth/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return {
        success: false,
        error: {
          code: res.status,
          message: data?.error?.message || "Update failed",
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
