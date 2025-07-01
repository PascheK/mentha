// components/dashboard/MobileSidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items?: NavItem[];
}



const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose, items  }) => {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 animate-fade-in" onClick={onClose} />

      <aside
        className="relative z-50 w-64 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4 overflow-y-auto transform transition-transform duration-300 animate-slide-in-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end mb-4">
          <button onClick={onClose} aria-label="Close menu">
            <X className="w-6 h-6 text-gray-700 dark:text-white" />
          </button>
        </div>

        <nav className="space-y-2">
          {items?.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center space-x-3 p-2 rounded-md font-medium transition duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800",
                pathname === item.href &&
                  "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
              )}
            >
              {item.icon && <span className="text-xl">{item.icon}</span>}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default MobileSidebar;
