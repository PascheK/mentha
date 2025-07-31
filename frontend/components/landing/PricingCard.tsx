"use client";

import { motion } from "framer-motion";
import Button from "@/components/common/Button";
import { CheckCircle, XCircle } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  featuresIncluded: string[];
  allFeatures: string[];
  cta: string;
  highlighted?: boolean;
}

export default function PricingCard({
  title,
  price,
  featuresIncluded,
  allFeatures,
  cta,
  highlighted = false,
}: PricingCardProps) {
  return (
    <motion.div
      className={`relative flex flex-col rounded-xl border border-neutral-800 bg-[#111] p-6 text-white shadow-md transition duration-300 ${
        highlighted ? "ring-2 ring-[#49fe9d]/70" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {highlighted && (
        <div className="absolute -top-3 right-4 rounded-full bg-[#49fe9d] px-3 py-1 text-xs font-semibold text-[#111827] shadow-md">
          Most Popular
        </div>
      )}

      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-3xl font-extrabold text-[#49fe9d]">{price}</p>

      <ul className="mt-6 space-y-3 text-sm">
        {allFeatures.map((feature, i) => {
          const included = featuresIncluded.includes(feature);
          return (
            <li key={i} className="flex items-center gap-2">
              {included ? (
                <CheckCircle className="h-4 w-4 text-[#49fe9d]" />
              ) : (
                <XCircle className="h-4 w-4 text-neutral-600" />
              )}
              <span
                className={`${
                  included
                    ? "text-neutral-300"
                    : "text-neutral-600 line-through"
                }`}
              >
                {feature}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-8">
        <Button
          variant={highlighted ? "primary" : "secondary"}
          className="w-full"
        >
          {cta}
        </Button>
      </div>
    </motion.div>
  );
}
