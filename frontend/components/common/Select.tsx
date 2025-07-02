'use client';
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
}

const Select: React.FC<SelectProps> = ({ label, options, error, className = '', ...props }) => {
  const { theme } = useTheme();
  const baseStyle = theme === 'dark' ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-300';
  const labelColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-700';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-1"
    >
      {label && <label className={`block text-sm font-medium ${labelColor}`}>{label}</label>}
      <select {...props} className={`w-full p-2 border rounded ${baseStyle} ${className}`}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </motion.div>
  );
};

export default Select;