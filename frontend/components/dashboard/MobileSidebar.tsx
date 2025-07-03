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



const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose, items }) => {
  const pathname = usePathname();
  const [closing, setClosing] = React.useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 300);
  };

  if (!isOpen && !closing) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 ${closing ? "animate-fade-out" : "animate-fade-in"}`}
        onClick={handleClose}
      />

      <aside
        className={`relative z-50 w-64 h-full bg-bg border-r border-border p-4 overflow-y-auto transform transition-transform duration-300 ${closing ? "animate-slide-out-left" : "animate-slide-in-left"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end mb-4">
          <button onClick={handleClose} aria-label="Close menu">
            <X className="w-6 h-6 text-text" />
          </button>
        </div>

        <nav className="space-y-2">
          {items?.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleClose}
              className={cn(
                "flex items-center space-x-3 p-2 rounded-md font-medium transition duration-200 ease-in-out hover:bg-input-bg/80",
                pathname === item.href && "bg-primary/20 text-primary"
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
