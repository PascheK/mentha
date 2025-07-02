'use client'

import React, { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '@/hooks/useOutsideClick';

// Simple modal with fade and scale animations

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => {
    if (open) onClose();
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <motion.div
            ref={ref}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
