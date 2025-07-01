"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface PasswordInputProps {
  label?: string;
  name: string;
  value: string;
  showStrength?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}

const getStrength = (password: string) => {
  if (password.length < 6) return "weak";
  if (!/[A-Z]/.test(password) || !/\d/.test(password)) return "medium";
  return "strong";
};

const strengthLabel = {
  weak: "Weak",
  medium: "Medium",
  strong: "Strong",
};

const strengthColor = {
  weak: "bg-red-500",
  medium: "bg-yellow-500",
  strong: "bg-green-500",
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  name,
  value,
  showStrength = false,
  onChange,
  required = false,
  placeholder = "Enter your password",
}) => {
  const { theme } = useTheme();
  const [show, setShow] = useState(false);
  const [strength, setStrength] = useState<"weak" | "medium" | "strong">("weak");

  useEffect(() => {
    setStrength(getStrength(value));
  }, [value]);

  const baseStyle = `w-full p-3 rounded-lg border transition duration-200 outline-none`;
  const darkStyle = `bg-gray-800 border-gray-600 text-white placeholder-gray-400`;
  const lightStyle = `bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500`;

  return (
    <div className="space-y-2">
      {label && <label htmlFor={name} className="font-medium">{label}</label>}
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        className={`${baseStyle} ${theme === "dark" ? darkStyle : lightStyle}`}

        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
          tabIndex={-1}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
        {showStrength && (
          <>
                {value  && (
        <div className="h-2 w-full rounded bg-gray-300 overflow-hidden">
          <div
            className={`h-full ${strengthColor[strength]}`}
            style={{ width: strength === "weak" ? "33%" : strength === "medium" ? "66%" : "100%" }}
          />
        </div>
      )}
      {value && (
        <p className="text-sm text-gray-500">
          Strength: <span className="font-semibold capitalize">{strengthLabel[strength]}</span>
        </p>
      )}
         </> )}

    </div>
  );
};

export default PasswordInput;
