"use client";

import React from "react";

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
  return (
    <label
      htmlFor={name}
      className="flex items-center space-x-2 text-sm cursor-pointer select-none text-text"
    >
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        required={required}
        className="h-4 w-4 accent-primary rounded"
      />
      <span>{label}</span>
    </label>
  );
};

export default CheckboxField;
