"use client";

import React from "react";
import { useUser } from "@/contexts/UserContext";
import { motion } from "framer-motion";
import Link from "next/link";

const SiteUsageIndicator: React.FC = () => {
  const { user } = useUser();
  if (!user) return null;

  const used = user.sites.length;
  const max = user.subscription.maxSites;
  const percentage = Math.min((used / max) * 100, 100);

  const isFull = used >= max;
  const isNearLimit = used / max >= 0.8;

  return (
    <motion.div
      className="bg-muted space-y-2 rounded-xl border p-4 shadow-sm"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">
          You’re using <span className="font-bold">{used}</span> / {max} sites
        </p>
        {isFull && (
          <Link
            href="/dashboard/billing"
            className="text-xs font-medium text-primary underline"
          >
            Upgrade plan
          </Link>
        )}
      </div>

      <div className="relative h-2 overflow-hidden rounded-full bg-gray-300/40">
        <motion.div
          className={`h-full rounded-full ${
            isFull
              ? "bg-red-500"
              : isNearLimit
                ? "bg-yellow-500"
                : "bg-green-500"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

export default SiteUsageIndicator;
