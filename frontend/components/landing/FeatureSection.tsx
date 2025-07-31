"use client";

import FeatureCard from "./FeatureCard";
import { LayoutDashboard, Rocket, Paintbrush, ShieldCheck } from "lucide-react";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";

export default function FeatureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: <LayoutDashboard />,
      title: "Modular Content Editor",
      description:
        "Build pages visually with reusable blocks, drag-and-drop UI, and structured data.",
    },
    {
      icon: <Rocket />,
      title: "Instant Deployment",
      description:
        "Deploy to Docker with one click. No DevOps skills required.",
    },
    {
      icon: <Paintbrush />,
      title: "Fully Themable",
      description:
        "Customizable with tokens, light/dark mode built-in, and full Tailwind support.",
    },
    {
      icon: <ShieldCheck />,
      title: "Secure by Design",
      description:
        "Built with authentication, roles, and encryption by default.",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative z-10 px-6 py-24 text-white sm:py-32 md:py-40"
    >
      <AnimatePresence>
        {isInView && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mx-auto mb-16 max-w-5xl text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Features built for modern creators
              </h2>
              <p className="mt-4 text-base text-neutral-400">
                Everything you need to build, launch and scale your site — no
                code required.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 2xl:grid-cols-4">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
