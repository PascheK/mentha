"use client";

import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
  ...props
}) => {
  const { theme } = useTheme();

  const baseStyle = `w-full p-3 rounded-lg border transition duration-200 outline-none`;
  const darkStyle = `bg-gray-800 border-gray-600 text-white placeholder-gray-400`;
  const lightStyle = `bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500`;

  return (
    <div className="w-full">
      <label htmlFor={name} className="block mb-1 text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        placeholder={label}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
        className={`${baseStyle} ${theme === "dark" ? darkStyle : lightStyle}`}
      />
    </div>
  );
};

export default InputField;
