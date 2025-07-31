"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Alice Martin",
    title: "Frontend Developer @ StudioNova",
    quote:
      "m3ntha is the first CMS I actually enjoy using. The interface is clean, fast, and gets out of my way.",
  },
  {
    name: "David Chen",
    title: "Freelancer & Indie Hacker",
    quote:
      "Deploying client sites used to take hours. Now it takes minutes. I can't go back.",
  },
  {
    name: "Leïla Ben Amar",
    title: "Product Manager @ SaaSly",
    quote:
      "Finally a CMS that speaks the language of both developers and content creators. We've migrated all our sites to m3ntha.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative z-10 px-6 py-24 text-white sm:py-32 md:py-40">
      <div className="mx-auto mb-16 max-w-4xl text-center">
        <motion.h2
          className="text-3xl font-bold sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Trusted by makers, teams & creators
        </motion.h2>
        <motion.p
          className="mt-4 text-base text-neutral-400"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          viewport={{ once: true }}
        >
          People love using m3ntha. Here’s what they’re saying.
        </motion.p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="rounded-xl border border-neutral-800 bg-[#111] p-6 text-left shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sm italic text-neutral-400">
              “{testimonial.quote}”
            </p>
            <div className="mt-4">
              <p className="text-sm font-semibold text-white">
                {testimonial.name}
              </p>
              <p className="text-xs text-neutral-500">{testimonial.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
