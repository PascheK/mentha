'use client';
import React, { useState, useEffect } from "react";
import { AsYouType } from "libphonenumber-js";

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  error,
  className = "",
  value = "",
  onChange,
  ...props
}) => {
  const baseStyle =
    "bg-input-bg text-text border-border placeholder-placeholder";

  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const formatted = new AsYouType("CH").input(raw);
    setDisplayValue(formatted);
    onChange?.(formatted);
  };

  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-text">
          {label}
        </label>
      )}
      <input
        type="tel"
        inputMode="tel"
        placeholder="+41 79 123 45 67"
        value={displayValue}
        onChange={handleChange}
        className={`w-full p-2 border rounded ${baseStyle} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
};

export default PhoneInput;
