// components/dashboard/stats/DashboardStatsGrid.tsx
"use client";

import React from "react";
import StatCard from "./StatCard";
import { LayoutDashboard, FileText, Globe, Users } from "lucide-react";

const DashboardStatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard title="Total Sites" value={12} icon={<Globe />} />
      <StatCard title="Total Pages" value={47} icon={<FileText />} />
      <StatCard title="Active Users" value={128} icon={<Users />} />
      <StatCard title="Visits Today" value={823} icon={<LayoutDashboard />} />
    </div>
  );
};

export default DashboardStatsGrid;