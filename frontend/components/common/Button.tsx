"use client";

import React from "react";
import { motion } from "framer-motion";

import { HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "success" | "ghost";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  disabled = false,
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-primary text-[#111827]",
    secondary:
      "bg-transparent border border-primary text-primary hover:bg-input-bg/50",
    success: "bg-success text-white",
    ghost: "bg-transparent text-text hover:bg-input-bg dark:hover:bg-border/20",
  };

  return (
    <motion.button
      {...props}
      disabled={disabled}
      className={`rounded px-4 py-2 font-medium shadow-sm transition-colors duration-200 ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      whileFocus={{ outline: "none" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
