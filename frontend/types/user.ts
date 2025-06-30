export interface Subscription {
  plan: "free" | "standard" | "pro";
  maxSites: number;
  status: "active" | "trialing" | "canceled";
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  name: string;
  email: string;
  photo?: string;
  emailVerified: boolean;
  role: "user" | "admin";
  termsAccepted: boolean;
  subscription: Subscription;
  sites: string[];
  createdAt: string;
}
