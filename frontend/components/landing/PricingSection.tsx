"use client";

import PricingCard from "./PricingCard";
import { motion } from "framer-motion";

export default function PricingSection() {
  const allFeatures = [
    "1 site",
    "5 sites",
    "20+ sites",
    "Basic editing tools",
    "Advanced editor",
    "Custom domains",
    "Docker deployment",
    "Team collaboration",
    "Community support",
    "Priority support",
    "Premium support",
  ];

  const plans = [
    {
      title: "Free",
      price: "$0/month",
      featuresIncluded: ["1 site", "Basic editing tools", "Community support"],
      cta: "Get Started",
    },
    {
      title: "Standard",
      price: "$12/month",
      featuresIncluded: [
        "5 sites",
        "Advanced editor",
        "Docker deployment",
        "Priority support",
      ],
      cta: "Upgrade Now",
      highlighted: true,
    },
    {
      title: "Pro",
      price: "$29/month",
      featuresIncluded: [
        "20+ sites",
        "Advanced editor",
        "Docker deployment",
        "Custom domains",
        "Team collaboration",
        "Premium support",
      ],
      cta: "Go Pro",
    },
  ];

  return (
    <section className="relative z-10 px-6 py-24 text-white sm:py-32 md:py-40">
      <motion.div
        className="mx-auto mb-16 max-w-5xl text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-3xl font-bold sm:text-4xl">
          Flexible pricing for every stage
        </h2>
        <p className="mt-4 text-base text-neutral-400">
          Whether you&apos;re just getting started or scaling a business, there&apos;s a
          plan for you.
        </p>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} allFeatures={allFeatures} />
        ))}
      </div>
    </section>
  );
}
