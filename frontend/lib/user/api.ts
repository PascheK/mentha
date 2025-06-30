// lib/user/api.ts
import Cookies from "js-cookie";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const loginUser = async (
  email: string,
  password: string,
  staySignedIn: boolean
): Promise<ApiResponse<string>> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) return { error: { message: data.message, code: res.status } };

  Cookies.set("token", data.token, staySignedIn ? { expires: 7 } : undefined);

  return { data: data.token };
};


export const registerUser = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  profilePicture: string,
  termsAccepted: boolean
) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
      profilePicture,
      termsAccepted,
    }),
  });

  const data = await res.json();
  if (!res.ok) return { error: { message: data.message, code: res.status } };
  return data;
};



export const fetchCurrentUser = async (): Promise<ApiResponse<User>> => {
  const token = Cookies.get("token");
  if (!token) return { error: { message: "No token" } };

  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    return { error: { message: err.message, code: res.status } };
  }

  const user: User = await res.json();
  return { data: user };
};
export const verifyEmail = async (token: string): Promise<ApiResponse<string>> => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email/${token}`);
    const data = await res.json();
    if (!res.ok) return { error: { message: data.message || "Invalid token", code: res.status } };
    return { data: data.token }; 

};

export const logoutUser = () => {
  Cookies.remove("token");
};
