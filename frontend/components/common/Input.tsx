'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  const baseStyle =
    'bg-input-bg text-text border-border placeholder-placeholder';

  const labelColor = 'text-text';

  return (
    <motion.div
      className="space-y-1"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {label && (
        <label className={`block text-sm font-medium ${labelColor}`}>
          {label}
        </label>
      )}

      <input
        {...props}
        className={`w-full p-2 border rounded transition-all duration-200 focus:ring-2 focus:outline-none focus:ring-focus-ring ${baseStyle} ${className}`}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </motion.div>
  );
};

export default Input;
