"use client";

import React from "react";
import { motion } from "framer-motion";

import { HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "ghost";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-primary text-white",
    secondary: "bg-input-bg text-text",
    success: "bg-success text-white",
    ghost:
      "bg-transparent text-text hover:bg-input-bg dark:hover:bg-border/20",
  };

  return (
    <motion.button
      {...props}
      className={`px-4 py-2 rounded  font-medium shadow-sm transition-colors duration-200 ${variants[variant]} ${className}`}
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