"use client";
import React, { useState, useCallback } from "react";
import { AlertContext } from "@/hooks/useAlert";
import AlertRenderer from "./AlertRenderer";
import { AlertOptions } from "@/types/alerts";

const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<AlertOptions | null>(null);

  const showAlert = useCallback((options: AlertOptions) => {
    setAlert({ ...options });
    if (options.duration !== 0) {
      setTimeout(() => setAlert(null), options.duration ?? 5000);
    }
  }, []);

  const hideAlert = useCallback(() => setAlert(null), []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <AlertRenderer alert={alert} onClose={hideAlert} />
    </AlertContext.Provider>
  );
};

export default AlertProvider;
