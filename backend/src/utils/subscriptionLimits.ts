export const MAX_SITES_BY_PLAN = {
  free: 1,
  standard: 5,
  pro: 20,
};

export function getMaxSitesForPlan(plan: "free" | "standard" | "pro") {
  return MAX_SITES_BY_PLAN[plan];
}
