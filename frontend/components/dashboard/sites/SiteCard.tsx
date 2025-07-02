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
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-900">
      {image && <img src={image} alt={name} className="w-full h-32 object-cover" />}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{status}</p>
        <a href={url} className="text-blue-600 dark:text-blue-400 text-sm mt-2 inline-block">
          Visit Site
        </a>
      </div>
    </div>
  );
};

export default SiteCard;