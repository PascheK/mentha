// File: components/billing/PlanCardList.tsx
"use client";

import { User } from "@/types/user";
import { CheckCircle, Star } from "lucide-react";
import Button from "@/components/common/Button";
import { useLoader } from "@/contexts/LoaderContext";
import { startCheckout } from "@/lib/subscriptionActions";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Basic features for personal use.",
    bg: "bg-gray-50",
    text: "text-gray-900",
  },
  {
    id: "standard",
    name: "Standard",
    price: 10,
    description: "Advanced tools and automation.",
    popular: true,
    bg: "bg-green-50",
    text: "text-green-900",
  },
  {
    id: "pro",
    name: "Pro",
    price: 20,
    description: "Team collaboration and integrations.",
    bg: "bg-amber-50",
    text: "text-amber-900",
  },
];

export default function PlanCardList({ user }: { user: User }) {
  const { setLoading } = useLoader();

  const handleClick = async (planId: "standard" | "pro") => {
    setLoading(true);
    try {
      const url = await startCheckout(planId);
      window.location.href = url;
    } catch (err) {
      console.error("Failed to redirect to checkout:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {PLANS.map((plan) => {
        const isCurrent = user.subscription.plan === plan.id;
        return (
          <div
            key={plan.id}
            className={`rounded-2xl border p-6 shadow-sm ${plan.bg} ${plan.text}`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              {plan.popular && <Star className="h-5 w-5 text-yellow-500" />}
            </div>
            <p className="mt-1 text-sm">{plan.description}</p>
            <div className="mt-4 text-3xl font-bold">${plan.price}/mo</div>
            {isCurrent ? (
              <Button className="mt-4 w-full" disabled>
                <CheckCircle className="mr-2 h-4 w-4" /> Current plan
              </Button>
            ) : (
              <Button
                className="mt-4 w-full"
                onClick={() => handleClick(plan.id as "standard" | "pro")}
              >
                Upgrade
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
