"use client";

import { motion } from "framer-motion";

export default function DemoSection() {
  return (
    <section className="relative z-10 px-6 py-24 text-white sm:py-32 md:py-40">
      <div className="mx-auto max-w-5xl text-center">
        <motion.h2
          className="text-3xl font-bold sm:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          See m3ntha in action
        </motion.h2>
        <motion.p
          className="mt-4 text-base text-neutral-400"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          viewport={{ once: true }}
        >
          A fast and elegant CMS that works out of the box.
        </motion.p>
      </div>

      <motion.div
        className="relative mx-auto mt-16 aspect-video w-full max-w-5xl overflow-hidden rounded-xl border border-[#49fe9d]/30 bg-neutral-900 shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <iframe
          className="h-full w-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
          title="m3ntha CMS Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </motion.div>
    </section>
  );
}
