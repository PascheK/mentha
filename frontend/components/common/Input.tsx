'use client';
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  const { theme } = useTheme();

  const baseStyle =
    theme === 'dark'
      ? 'bg-gray-900 text-white border-gray-700 placeholder-gray-500'
      : 'bg-white text-black border-gray-300 placeholder-gray-400';

  const labelColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-700';

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
        className={`w-full p-2 border rounded transition-all duration-200 focus:ring-2 focus:outline-none focus:ring-blue-500 ${baseStyle} ${className}`}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </motion.div>
  );
};

export default Input;
