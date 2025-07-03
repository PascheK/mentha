'use client';
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface PasswordInputProps {
  label?: string;
  name: string;
  value: string;
  showStrength?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  error?: string;
}

const getStrength = (password: string) => {
  if (password.length < 6) return 'weak';
  if (!/[A-Z]/.test(password) || !/\d/.test(password)) return 'medium';
  return 'strong';
};

const strengthLabel = {
  weak: 'Weak',
  medium: 'Medium',
  strong: 'Strong',
};

const strengthColor = {
  weak: 'bg-error',
  medium: 'bg-warning',
  strong: 'bg-success',
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  name,
  value,
  showStrength = false,
  onChange,
  required = false,
  placeholder = 'Enter your password',
  error,
}) => {
  const [show, setShow] = useState(false);
  const [strength, setStrength] = useState<'weak' | 'medium' | 'strong'>('weak');

  useEffect(() => {
    setStrength(getStrength(value));
  }, [value]);

  const baseStyle =
    'w-full p-3 rounded-lg border transition duration-200 outline-none bg-input-bg border-border text-text placeholder-placeholder';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-2"
    >
      {label && (
        <label htmlFor={name} className="font-medium text-text">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={baseStyle}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-placeholder"
          tabIndex={-1}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {showStrength && value && (
        <>
          <div className="h-2 w-full rounded bg-border overflow-hidden">
            <div
              className={`h-full ${strengthColor[strength]}`}
              style={{ width: strength === 'weak' ? '33%' : strength === 'medium' ? '66%' : '100%' }}
            />
          </div>
          <p className="text-sm text-placeholder">
            Strength: <span className="font-semibold capitalize">{strengthLabel[strength]}</span>
          </p>
        </>
      )}
      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </motion.div>
  );
};

export default PasswordInput;
