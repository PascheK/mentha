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

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, staySignedIn: boolean) => Promise<void>;
  loginFromToken: (token: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    profilePicture: string,
    staySignedIn: boolean
  ) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await fetchCurrentUser();
      if (isApiSuccess<User>(res)) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, staySignedIn: boolean) => {
    await loginUser(email, password, staySignedIn);
    await refreshUser();
  };

  const register = async (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    profilePicture: string,
    staySignedIn: boolean
  ) => {
    await registerUser(
      firstName,
      lastName,
      username,
      email,
      password,
      profilePicture,
      true // termsAccepted
    );
    await login(email, password, staySignedIn);
  };
  const loginFromToken = async (token: string) => {
    await verifyEmail(token);
  }

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loading, login,loginFromToken, logout, register, refreshUser }}
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
