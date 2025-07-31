"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { TargetAndTransition } from "framer-motion";

function getRandomBlobMotion(): TargetAndTransition {
  const random = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  return {
    x: [0, random(-100, 100), random(-50, 50), 0],
    y: [0, random(-100, 100), random(-50, 50), 0],
    scale: [1, random(0.9, 1.2), random(0.95, 1.1), 1],
    borderRadius: [
      "50%",
      "60% 40% 40% 60% / 40% 60% 60% 40%",
      "40% 60% 60% 40% / 60% 40% 40% 60%",
      "50%",
    ],
    transition: {
      duration: random(15, 30),
      repeat: Infinity,
      repeatType: "loop" as const, // 🟢 FIX ici
      ease: "easeInOut",
    },
  };
}

export default function ParallaxBlobBackground() {
  const [motions, setMotions] = useState(() => [
    getRandomBlobMotion(),
    getRandomBlobMotion(),
    getRandomBlobMotion(),
  ]);

  // Optionnel : à chaque montage on change les mouvements
  useEffect(() => {
    const interval = setInterval(() => {
      setMotions([
        getRandomBlobMotion(),
        getRandomBlobMotion(),
        getRandomBlobMotion(),
      ]);
    }, 30000); // Change toutes les 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-20 bg-[#0a0a0a]" />

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-[15%] left-[10%] h-[400px] w-[400px] bg-[oklch(0.91_0.28_154.81)] opacity-60 mix-blend-screen blur-[120px]"
          animate={motions[0]}
        />
        <motion.div
          className="absolute top-[50%] right-[8%] h-[450px] w-[450px] bg-[oklch(0.95_0.33_154.81)] opacity-50 mix-blend-screen blur-[160px]"
          animate={motions[1]}
        />
        <motion.div
          className="absolute bottom-[10%] left-1/2 h-[500px] w-[500px] -translate-x-1/2 bg-[oklch(0.88_0.3_154.81)] opacity-40 mix-blend-screen blur-[200px]"
          animate={motions[2]}
        />
      </div>
    </>
  );
}
