'use client'

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Handles basic page fade/slide transitions between routes

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="min-h-screen flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
