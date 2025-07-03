"use client";

import React from "react";

import NotificationBell from "@/components/common/NotificationBell";
import UserDropdown from "@/components/dashboard/UserDropdown";
import ThemeToggle from "@/components/common/ThemeToggle";
import { Menu } from "lucide-react";

interface TopbarProps {
  onMobileSidebarToggle: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onMobileSidebarToggle }) => {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-border bg-bg px-6 text-text">
      <button
        className="md:hidden"
        onClick={onMobileSidebarToggle}
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
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
