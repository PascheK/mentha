"use client";

import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { useTheme } from "@/contexts/ThemeContext";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div
      className={`flex min-h-screen ${
        theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
            <Sidebar isMobileOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />

      <div className="flex flex-col flex-1">
                <Topbar onMobileSidebarToggle={() => setIsMobileOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
