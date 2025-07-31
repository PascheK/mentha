"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <motion.div
      className="flex flex-col items-start gap-4 rounded-xl border border-neutral-800 bg-[#111] p-6 text-white shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="text-3xl text-[#49fe9d]">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-neutral-400">{description}</p>
    </motion.div>
  );
}
