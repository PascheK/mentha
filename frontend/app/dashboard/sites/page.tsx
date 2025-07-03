// app/dashboard/sites/page.tsx
"use client";

import React, { useState } from "react";
import { useSites } from "@/hooks/useSites"; // à créer dans l'étape 3
import Button from "@/components/common/Button"; // supposé déjà présent
import SiteCard from "@/components/sites/SiteCard"; // à créer
import CreateSiteModal from "@/components/sites/CreateSiteModal"; // à créer
import { motion } from "framer-motion";
import SiteUsageIndicator from "@/components/sites/SiteUsageIndicator";

const SitesPage = () => {
  const { sites, loading, error, refreshSites } = useSites(); // hook fictif pour l'instant
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Sites</h1>
        <Button onClick={() => setIsModalOpen(true)}>Create Site</Button>
      </div>
      <SiteUsageIndicator />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: </p>
      ) : sites.length === 0 ? (
        <div className="text-muted-foreground text-center">
          You don’t have any sites yet.
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
          layout
        >
          {sites.map((site) => (
            <SiteCard key={site._id} site={site} refreshSites={refreshSites} />
          ))}
        </motion.div>
      )}

      <CreateSiteModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshSites={refreshSites}
      />
    </div>
  );
};

export default SitesPage;
