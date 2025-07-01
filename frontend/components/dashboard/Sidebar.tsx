"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { useTheme } from "@/context/ThemeContext";
import MobileSidebar from "./MobileSidebar";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface SidebarProps {
  isMobileOpen: boolean;
  onClose: () => void;
  collapsed?: boolean;
  items?: NavItem[];
}

const defaultItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Profile", href: "/dashboard/profile" },
  { label: "Subscription", href: "/dashboard/subscription" },
  { label: "Sites", href: "/dashboard/sites" },
];

const Sidebar: React.FC<SidebarProps> = ({   
  isMobileOpen,
  onClose,
  collapsed = false,
  items = defaultItems,}) => {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <>
       <aside
      className={cn(
        "h-screen p-4 hidden md:block border-r transition-all duration-300",
        collapsed ? "w-20" : "w-64",
        theme === "dark" ? "bg-gray-900 text-white border-gray-800" : "bg-white text-gray-900 border-gray-200"
      )}
    >
      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 p-2 rounded-md font-medium transition duration-200 ease-in-out",
              theme === "dark"
                ? "hover:bg-gray-800"
                : "hover:bg-gray-100",
              pathname === item.href &&
                (theme === "dark"
                  ? "bg-blue-900 text-blue-300"
                  : "bg-blue-100 text-blue-600")
            )}
          >
            {item.icon && <span className="text-xl">{item.icon}</span>}
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
    {isMobileOpen && (
      <MobileSidebar
        isOpen={isMobileOpen}
        onClose={onClose}
        items={items}
      />
      )}

    </>
   
  );
};

export default Sidebar;
