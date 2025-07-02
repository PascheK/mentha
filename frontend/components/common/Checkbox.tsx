'use client';
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, className = '', ...props }) => {
  const { theme } = useTheme();
  const textClass = theme === 'dark' ? 'text-gray-200' : 'text-gray-700';

  return (
    <motion.label
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`inline-flex items-center space-x-2 ${textClass}`}
    >
      <input type="checkbox" {...props} className={`form-checkbox ${className}`} />
      <span>{label}</span>
    </motion.label>
  );
};

export default Checkbox;