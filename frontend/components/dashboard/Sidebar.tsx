"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import MobileSidebar from "./MobileSidebar";
import Image from "next/image";
import { motion } from "framer-motion";

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
  { label: "Subscription", href: "/dashboard/billing" },
  { label: "Sites", href: "/dashboard/sites" },
];

const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen,
  onClose,
  collapsed = false,
  items = defaultItems,
}) => {
  const pathname = usePathname();

  return (
    <>
      <motion.aside
        className={cn(
          "hidden h-screen border-r border-border bg-bg p-4 text-text md:block",
        )}
        animate={{ width: collapsed ? 80 : 256 }} // 80px = w-20, 256px = w-64
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <nav className="space-y-2">
          <div className="h-16 w-full">
            <Image
              src="/assets/logos/logo-full.svg"
              alt="Mentha Logo"
              width={120}
              height={40}
              className="mx-auto"
            />
          </div>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-md p-2 font-medium transition duration-200 ease-in hover:bg-input-bg/80",
                pathname === item.href && "bg-primary/20 text-primary",
              )}
            >
              {item.icon && <span className="text-xl">{item.icon}</span>}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </motion.aside>

      {isMobileOpen && (
        <MobileSidebar isOpen={isMobileOpen} onClose={onClose} items={items} />
      )}
    </>
  );
};

export default Sidebar;
