"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  verifyEmail,
  logoutUser,
  registerUser,
  fetchCurrentUser,
} from "@/lib/user/api";
import { User } from "@/types/user";
import { isApiSuccess } from "@/utils/isApiSuccess";
import { ApiResponse } from "@/types/api";

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, staySignedIn: boolean) => Promise<ApiResponse<string>>;
  loginFromToken: (token: string) => Promise<ApiResponse<string>>;
  register: (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    profilePicture: string,
    termsAccepted: boolean
  ) => Promise<ApiResponse<string>>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const res = await fetchCurrentUser();
    if (isApiSuccess<User>(res)) {
      setUser(res.data);
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  const login = async (
    email: string,
    password: string,
    staySignedIn: boolean
  ): Promise<ApiResponse<string>> => {
    const res = await loginUser(email, password, staySignedIn);
    if (isApiSuccess(res)) {
      await refreshUser();
    }
    return res;
  };

  const register = async (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    profilePicture: string,
    termsAccepted: boolean = false
  ): Promise<ApiResponse<string>> => {
    return await registerUser(
      firstName,
      lastName,
      username,
      email,
      password,
      profilePicture,
      termsAccepted
    );
  };

  const loginFromToken = async (token: string): Promise<ApiResponse<string>> => {
    const res = await verifyEmail(token);
    if (isApiSuccess(res)) {
      await refreshUser();
    }
    return res;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        loginFromToken,
        logout,
        register,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
