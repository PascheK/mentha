// components/dashboard/sites/RecentSitesList.tsx
"use client";

import React from "react";
import SiteCard from "./SiteCard";

const RecentSitesList = () => {
  const mockSites = [
    { name: "Portfolio", status: "Published", url: "#", image: "/sample.jpg" },
    { name: "Landing Page", status: "Draft", url: "#", image: "/sample2.jpg" },
    { name: "E-commerce", status: "Published", url: "#", image: "/sample3.jpg" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockSites.map((site, idx) => (
        <SiteCard key={idx} {...site} />
      ))}
    </div>
  );
};

export default RecentSitesList;
