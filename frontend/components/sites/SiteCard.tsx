// src/components/sites/SiteCard.tsx
"use client";

import React from "react";
import { Site, SiteStatus } from "@/types/site";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { cn } from "@/utils/cn"; // pour gérer les classes conditionnelles
import { useAlert } from "@/hooks/useAlert";
import { deleteSite } from "@/lib/siteActions";
import { isApiSuccess } from "@/utils/isApiSuccess";
import { useLoader } from "@/contexts/LoaderContext";
import { useUser } from "@/contexts/UserContext";

interface SiteCardProps {
  site: Site;
  refreshSites: () => Promise<void>;
}

const statusColors: Record<SiteStatus, string> = {
  draft: "bg-yellow-200 text-yellow-800",
  published: "bg-green-200 text-green-800",
  archived: "bg-gray-300 text-gray-700",
};

const SiteCard: React.FC<SiteCardProps> = ({ site, refreshSites }) => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { setLoading } = useLoader();
  const { refreshUser } = useUser();
  const handleEdit = () => router.push(`/dashboard/sites/${site._id}`);
  const handleDelete = () => {
    showAlert({
      type: "warning",
      title: "Delete this site?",
      message: `This action is irreversible.`,
      actions: [
        {
          label: "Cancel",
          onClick: () => {}, // rien à faire
        },
        {
          label: "Delete",
          onClick: async () => {
            setLoading(true);
            const res = await deleteSite(site._id);
            if (isApiSuccess(res)) {
              showAlert({
                type: "success",
                message: "Site deleted successfully",
                title: "",
              });
              await refreshUser;
              await refreshSites();
            } else {
              showAlert({
                type: "error",
                message: res.error?.message || "Error deleting site",
                title: "",
              });
            }
            setLoading(false);
          },
        },
      ],
    });
  };

  return (
    <motion.div
      className="flex flex-col justify-between rounded-xl border border-border bg-bg p-4 shadow-sm transition hover:shadow-md"
      whileHover={{ scale: 1.02 }}
      layout
    >
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{site.name}</h2>
        <p className="text-muted-foreground text-xs text-blue-400">
          https://{site.subdomain}.m3ntha.ch
        </p>
        <span
          className={cn(
            "inline-block w-fit rounded-md px-2 py-0.5 text-xs font-medium",
            statusColors[site.status],
          )}
        >
          {site.status}
        </span>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={() =>
            window.open(`https://${site.subdomain}.m3ntha.ch`, "_blank")
          }
          title="View site"
          className="text-muted-foreground hover:text-foreground"
        >
          <ExternalLink size={18} />
        </button>
        <button
          onClick={handleEdit}
          title="Edit site"
          className="text-muted-foreground hover:text-foreground"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={handleDelete}
          title="Delete site"
          className="text-destructive hover:text-red-600"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default SiteCard;
