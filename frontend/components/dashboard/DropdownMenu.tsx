"use client";

import React, { useState, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: {
    opacity: 0,
    scale: 0.3,
    filter: "blur(20px)",
    transition: { duration: 0.2 },
  },
};

const listVariants: Variants = {
  open: {
    clipPath: "inset(0% 0% 0% 0% round 0px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
  closed: {
    clipPath: "inset(10% 50% 90% 50% round 0px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3,
      when: "afterChildren",
      staggerDirection: -1,
      staggerChildren: 0.06,
    },
  },
};

interface DropdownItem {
  id: string;
  element: React.ReactNode; // <— JSX libre
  className?: string;
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <motion.nav
      ref={dropdownRef}
      className={`relative h-full w-full ${className}`}
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      <motion.button
        className="flex items-center space-x-2 rounded p-2 transition duration-200 ease-in-out hover:bg-input-bg/80"
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {trigger}
      </motion.button>

      <div className="absolute right-0 z-50 mt-6">
        <motion.ul
          variants={listVariants}
          className="flex w-48 flex-col gap-2.5 rounded border-1 border-border bg-bg text-sm shadow-lg"
        >
          {items.map((item) => (
            <motion.li
              key={item.id}
              className={`li-animate px-4 py-2 ${item.className}`}
              variants={itemVariants}
            >
              {item.element}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.nav>
  );
};

export default DropdownMenu;
