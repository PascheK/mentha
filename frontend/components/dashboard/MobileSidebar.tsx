"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  onClose,
  items,
}) => {
  const pathname = usePathname();
  const [closing, setClosing] = React.useState(false);

  const handleClose = () => {
    setClosing(true);
    setClosing(false);
    onClose();
  };
  if (!isOpen && !closing) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            className="fixed top-0 left-0 z-50 h-full w-64 border-r border-border bg-bg p-4 text-text"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="mb-4 flex justify-end">
              <button onClick={handleClose} aria-label="Close menu">
                <X className="h-6 w-6 text-text" />
              </button>
            </div>
            <nav className="space-y-2">
              <div className="h-16 w-full">
                <Image
                  src="/assets/logos/logo-full.svg"
                  alt="Mentha Logo"
                  width={200}
                  height={40}
                  className="mx-auto"
                />
              </div>
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center space-x-3 rounded-md p-2 font-medium transition duration-200 ease-in hover:bg-input-bg/80",
                    pathname === item.href && "bg-primary/20 text-primary",
                  )}
                >
                  {item.icon && <span className="text-xl">{item.icon}</span>}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
