"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative z-10 bg-transparent px-6 py-32 text-center text-white"
    >
      <AnimatePresence>
        {isInView && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl leading-tight font-extrabold md:text-6xl">
              Build smarter with <span className="text-[#49fe9d]">m3ntha</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 md:text-xl">
              A professional CMS for individuals and businesses that want full
              control, flexibility, and performance — no compromise.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button className="rounded-lg bg-[#49fe9d] px-6 py-3 font-semibold text-black transition hover:scale-105">
                Get started
              </button>
              <button className="rounded-lg border border-[#49fe9d] px-6 py-3 text-[#49fe9d] transition hover:bg-[#49fe9d]/10">
                Learn more
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
