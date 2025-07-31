// shared/planConfig.ts
export const PLAN_LIMITS = {
  free: {
    maxSites: 1,
    price: 0,
  },
  standard: {
    maxSites: 5,
    price: 10,
  },
  pro: {
    maxSites: 20,
    price: 20,
  },
} as const;

export type PlanName = keyof typeof PLAN_LIMITS;
