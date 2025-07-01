import Cookies from "js-cookie";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

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
    console.log("Login successful, token received:", data.data);
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
  termsAccepted: boolean
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
