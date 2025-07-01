"use client";

import React from "react";

import NotificationBell from "@/components/common/NotificationBell";
import UserDropdown from "@/components/dashboard/UserDropdown";
import { useTheme } from "@/contexts/ThemeContext";
import ThemeToggle from "@/components/common/ThemeToggle";
import { Menu } from "lucide-react";
interface TopbarProps {
  onMobileSidebarToggle: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onMobileSidebarToggle }) => {
  const { theme } = useTheme();

  return (
    <header
      className={`w-full h-16 px-6 border-b flex items-center justify-between ${
        theme === "dark"
          ? "bg-gray-900 border-gray-800 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
            <button className="md:hidden" onClick={onMobileSidebarToggle} aria-label="Open menu">
        <Menu className="w-6 h-6" />
      </button>
      <div className="text-lg font-semibold">Dashboard</div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <NotificationBell />
        <UserDropdown />
      </div>
    </header>
  );
};

export default Topbar;