export type Subscription = {
  stripeSubscriptionId: string;
  userId: string;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  status: string;
  planId: string;
  interval: "day" | "week" | "month" | "year";
};

