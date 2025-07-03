// components/dashboard/stats/StatCard.tsx
"use client";

import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-bg border border-border rounded-xl shadow-sm">
      {icon && <div className="text-primary text-xl">{icon}</div>}
      <div>
        <p className="text-sm text-placeholder">{title}</p>
        <p className="text-xl font-semibold text-text">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;