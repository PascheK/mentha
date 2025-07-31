"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import exampleScreenshot from "@/public/assets/exampleScreenshot.png";

export default function BenefitsSection() {
  return (
    <section className="relative z-10 px-6 py-24 text-white sm:py-32 md:py-40">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* Texte gauche */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Built for teams, freelancers, and solo makers
          </h2>
          <p className="mt-6 text-base leading-relaxed text-neutral-300">
            Whether you’re building a client site or managing your own brand,
            m3ntha gives you all the tools to edit, deploy, and scale without
            the technical baggage. It’s the CMS you actually enjoy using.
          </p>

          <ul className="mt-8 space-y-4 text-sm text-neutral-400">
            <li>✅ Intuitive block-based editor</li>
            <li>✅ Secure user roles and access control</li>
            <li>✅ Scalable from 1 site to 20+</li>
          </ul>
        </motion.div>

        {/* Visuel droite */}
        <motion.div
          className="relative aspect-video w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 shadow-lg"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <Image
            src={exampleScreenshot}
            alt="Example of CMS dashboard"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
