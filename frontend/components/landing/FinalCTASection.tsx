"use client";

import { motion } from "framer-motion";
import Button from "@/components/common/Button";
import Link from "next/dist/client/link";

export default function FinalCTASection() {
  return (
    <section className="relative z-10 bg-[#49fe9d] px-6 py-24 text-[#111827] sm:py-32 md:py-40">
      <motion.div
        className="mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold sm:text-4xl">
          Start building with{" "}
          <span className="underline underline-offset-4">m3ntha</span> today
        </h2>
        <p className="mt-4 text-base text-[#111827]/80 sm:text-lg">
          It’s free to try. No credit card required.
        </p>

        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            className="bg-[#111827] text-white hover:bg-[#111827]/90"
            variant=""
          >
            <Link href="/register">Create your account</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
