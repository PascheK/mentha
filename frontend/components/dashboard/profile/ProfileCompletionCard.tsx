"use client";

import { useUser } from "@/contexts/UserContext";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { useMemo } from "react";

const CHECKS = [
  { key: "photo", label: "Profile picture" },
  { key: "firstName", label: "First name" },
  { key: "lastName", label: "Last name" },
  { key: "phoneNumber", label: "Phone number" },
  { key: "billingAddress", label: "Billing address" },
];

export default function ProfileCompletionCard() {
  const { user } = useUser();

  const checks = useMemo(() => {
    if (!user) return [];

    return CHECKS.map((item) => {
      if (item.key === "billingAddress") {
        const address = user.billingAddress;
        const isComplete =
          !!address.line1 &&
          !!address.city &&
          !!address.postalCode &&
          !!address.country;
        return { ...item, complete: isComplete };
      }

      let complete = false;
      if (item.key === "photo") complete = !!user.photo;
      else if (item.key === "firstName") complete = !!user.firstName;
      else if (item.key === "lastName") complete = !!user.lastName;
      else if (item.key === "phoneNumber") complete = !!user.phoneNumber;
      return {
        ...item,
        complete,
      };
    });
  }, [user]);

  const completedCount = checks.filter((c) => c.complete).length;
  const percentage = Math.round((completedCount / checks.length) * 100);

  return (
    <section className="h-full w-full max-w-md rounded-2xl border bg-bg p-6 text-text shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Profile Completion</h3>

      {/* Circle Progress */}
      <div className="relative mx-auto mb-6 h-24 w-24">
        <svg className="h-full w-full rotate-[-90deg]">
          <circle
            cx="48"
            cy="48"
            r="42"
            stroke="var(--color-border)"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="48"
            cy="48"
            r="42"
            stroke="var(--color-primary)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={2 * Math.PI * 42}
            strokeDashoffset={2 * Math.PI * 42 * ((100 - percentage) / 100)}
            strokeLinecap="round"
            initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
            animate={{
              strokeDashoffset: 2 * Math.PI * 42 * ((100 - percentage) / 100),
            }}
            transition={{ duration: 0.6 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-text">
          {percentage}%
        </div>
      </div>

      {/* Checklist */}
      <ul className="space-y-2 text-sm">
        {checks.map((item) => (
          <li key={item.key} className="flex items-center gap-2">
            {item.complete ? (
              <CheckCircle className="h-4 w-4 text-success" />
            ) : (
              <XCircle className="h-4 w-4 text-error" />
            )}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
