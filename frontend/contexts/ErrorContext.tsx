// context/ErrorContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAlert } from "@/hooks/useAlert";

interface ErrorContextValue {
  error: string | null;
  setError: (msg: string | null) => void;
}

const ErrorContext = createContext<ErrorContextValue | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<string | null>(null);
  const { showAlert } = useAlert();

  useEffect(() => {
    if (error) {
      showAlert({
        type: "error",
        title: "Error",
        message: error,
        duration: 6000,
        position: "top-right",
      });

      // optionnel : reset auto après le timeout
      const timer = setTimeout(() => setError(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [error, showAlert]);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const ctx = useContext(ErrorContext);
  if (!ctx) throw new Error("useError must be used within ErrorProvider");
  return ctx;
};
