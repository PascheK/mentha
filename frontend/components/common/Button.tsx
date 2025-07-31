"use client";

import React from "react";
import { motion } from "framer-motion";
import { HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn"; // Si tu as un utilitaire `classnames`, sinon remplace par string concat

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "success" | "ghost" | "";
  size?: "sm" | "md" | "lg";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  iconLeft,
  iconRight,
  type = "button",
  className = "",
  ...props
}) => {
  const variantClasses = {
    primary: "bg-primary text-[#111827] hover:bg-primary/90",
    secondary:
      "bg-transparent border border-primary text-primary hover:bg-input-bg/50",
    success: "bg-success text-white hover:bg-success/90",
    ghost: "bg-transparent text-text hover:bg-input-bg dark:hover:bg-border/20",
    "": "",
  };

  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-2.5",
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded font-medium shadow-sm transition-colors duration-200",
        className,
        variantClasses[variant],
        sizeClasses[size],
        disabled && "cursor-not-allowed opacity-50",
      )}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      {...props}
    >
      {iconLeft && <span className="mr-1.5">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="ml-1.5">{iconRight}</span>}
    </motion.button>
  );
};

export default Button;
