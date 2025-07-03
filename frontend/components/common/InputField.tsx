"use client";

import React from "react";

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
  const baseStyle =
    "w-full p-3 rounded-lg border transition duration-200 outline-none bg-input-bg border-border text-text placeholder-placeholder";

  return (
    <div className="w-full">
      <label htmlFor={name} className="block mb-1 text-sm font-medium text-text">
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
        className={baseStyle}
      />
    </div>
  );
};

export default InputField;
