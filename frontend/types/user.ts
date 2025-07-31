export type SubscriptionPlan = "free" | "standard" | "pro";
export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "canceled"
  | "past_due"
  | "unpaid"
  | "incomplete"
  | "incomplete_expired";

export type UserRole = "user" | "admin";

export interface Subscription {
  plan: SubscriptionPlan;
  maxSites: number;
  status: SubscriptionStatus;
  stripeSubscriptionId: string | null;
  currentPeriodStart?: number; // optional because "free" n’a pas d’abonnement stripe
  currentPeriodEnd?: number;
}

export interface BillingAddress {
  line1: string;
  line2?: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  name: string; // full name
  email: string;
  photo?: string;
  emailVerified: boolean;
  termsAccepted: boolean;
  role: UserRole;
  subscription: Subscription;
  stripeCustomerId: string;
  billingAddress: BillingAddress;
  phoneNumber?: string;
  language: string;
  hasUsedTrial: boolean;
  newsletterSubscribed: boolean;
  sites: string[];
  createdAt: string;
}
