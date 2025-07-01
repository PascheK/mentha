"use client";

import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface CheckboxFieldProps {
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  checked,
  onChange,
  required = false,
}) => {
  const { theme } = useTheme();

  return (
    <label
      htmlFor={name}
      className={`flex items-center space-x-2 text-sm cursor-pointer select-none ${
        theme === "dark" ? "text-gray-300" : "text-gray-800"
      }`}
    >
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        required={required}
        className="h-4 w-4 accent-blue-600 rounded"
      />
      <span>{label}</span>
    </label>
  );
};

export default CheckboxField;
