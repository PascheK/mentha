// components/dashboard/sites/SiteCard.tsx
"use client";

import React from "react";

interface SiteCardProps {
  name: string;
  status: string;
  url: string;
  image?: string;
}

const SiteCard: React.FC<SiteCardProps> = ({ name, status, url, image }) => {
  return (
    <div className="border border-border rounded-lg overflow-hidden shadow-sm bg-bg">
      {image && <img src={image} alt={name} className="w-full h-32 object-cover" />}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-text">{name}</h3>
        <p className="text-sm text-placeholder">{status}</p>
        <a href={url} className="text-primary text-sm mt-2 inline-block">
          Visit Site
        </a>
      </div>
    </div>
  );
};

export default SiteCard;