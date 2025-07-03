"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = stored
      ? stored === "dark"
      : document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", prefersDark);
    setIsDark(prefersDark);
  }, []);

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
    setRotation((prev) => prev + 360);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative rounded-full p-2 text-text transition duration-200 ease-in-out hover:bg-input-bg/80"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: 0, opacity: 0, scale: 0.8 }}
          animate={{
            rotate: rotation,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
          exit={{
            rotate: rotation + 180,
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.2 },
          }}
          className="inset-0 flex items-center justify-center"
        >
          {isDark ? <Sun size={25} /> : <Moon size={25} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
