// app/dashboard/page.tsx
"use client";

import React from "react";
import DashboardStatsGrid from "@/components/dashboard/stats/DashboardStatsGrid";
import RecentSitesList from "@/components/dashboard/sites/RecentSitesList";

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      {/* Statistiques */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <DashboardStatsGrid />
      </section>

      {/* Derniers sites */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Recent Sites</h2>
        <RecentSitesList />
      </section>
    </div>
  );
};

export default DashboardPage;
