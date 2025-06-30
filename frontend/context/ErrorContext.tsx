// context/ErrorContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

interface ErrorContextValue {
  error: string | null;
  setError: (msg: string | null) => void;
}

const ErrorContext = createContext<ErrorContextValue | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {error}
        </div>
      )}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const ctx = useContext(ErrorContext);
  if (!ctx) throw new Error("useError must be used within ErrorProvider");
  return ctx;
};
