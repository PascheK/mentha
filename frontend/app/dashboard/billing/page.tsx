// app/dashboard/billing/page.tsx
"use client";

import PlanCardList from "@/components/dashboard/billing/PlanCardList";
import { useUser } from "@/contexts/UserContext";

const BillingPage = () => {
  const { user } = useUser();
  if (!user) {
    return <div>Loading...</div>; // Handle loading state or redirect
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">Billing</h1>
      <PlanCardList user={user} />
    </div>
  );
};

export default BillingPage;
