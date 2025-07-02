"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
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

  return (
    <>
       <aside
      className={cn(
        "h-screen p-4 hidden md:block border-r transition-all duration-300",
        collapsed ? "w-20" : "w-64",
        "bg-color-bg text-color-text border-color-border"
      )}
    >
      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 p-2 rounded-md font-medium transition duration-200 ease-in-out hover:bg-color-input-bg/80",
              pathname === item.href && "bg-color-primary/20 text-color-primary"
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
