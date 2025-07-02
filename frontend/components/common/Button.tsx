"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

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
  const { theme } = useTheme();

  const variants = {
    primary: theme === "dark" ? "bg-blue-600 text-white" : "bg-blue-600 text-white",
    secondary: theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300 text-black",
    success: theme === "dark" ? "bg-green-600 text-white" : "bg-green-600 text-white",
    ghost:
      theme === "dark"
        ? "bg-gray-800 text-white hover:bg-gray-700"
        : "bg-gray-200 text-black hover:bg-gray-300",
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