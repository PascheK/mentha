"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSite } from "@/hooks/useSite";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SiteStatus } from "@/types/site";
import { cn } from "@/utils/cn";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useAlert } from "@/hooks/useAlert";
import { isApiSuccess } from "@/utils/isApiSuccess";
import { updateSite, deleteSite } from "@/lib/site/api";
import { useUser } from "@/contexts/UserContext";

const TABS = ["Pages", "Settings", "Analytics"] as const;
type TabType = (typeof TABS)[number];

const statusMap: Record<SiteStatus, string> = {
  draft: "bg-yellow-100 text-yellow-800",
  published: "bg-green-100 text-green-800",
  archived: "bg-gray-200 text-gray-800",
};

const SiteDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { refreshUser } = useUser();
  const { site, loading, error, refreshSite } = useSite(id as string);
  const [tab, setTab] = useState<TabType>("Pages");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<SiteStatus>("draft");
  const [saving, setSaving] = useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    if (site) {
      setName(site.name);
      setStatus(site.status);
    }
  }, [site]);

  if (loading) return <p>Loading...</p>;
  if (error || !site) return <p className="text-red-500">Site not found.</p>;

  const fullDomain = `https://${site.subdomain}.m3ntha.ch`;

  const handleUpdate = async () => {
    setSaving(true);
    const res = await updateSite(site._id, { name, status });

    if (isApiSuccess(res)) {
      showAlert({
        type: "success",
        title: "Site updated",
        message: "Your site has been updated successfully.",
        duration: 8000,
        position: "top-right",
      });
      await refreshSite();
    } else {
      showAlert({
        type: "error",
        title: "Site update failed",
        message: "Your site could not be updated.",
        duration: 8000,
        position: "top-right",
      });
    }

    setSaving(false);
  };

  const handleDelete = () => {
    showAlert({
      type: "warning",
      title: "Delete this site?",
      message: "This action is irreversible.",
      actions: [
        { label: "Cancel", onClick: () => {} },
        {
          label: "Delete",
          onClick: async () => {
            await deleteSite(site._id);
            showAlert({
              type: "success",
              title: "Site deleted",
              message: "Your site has been deleted successfully.",
              duration: 8000,
              position: "top-right",
            });
            await refreshUser();
            router.push("/dashboard/sites");
          },
        },
      ],
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <button
            onClick={() => router.push("/dashboard/sites")}
            className="text-muted-foreground hover:text-foreground flex items-center text-sm"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to sites
          </button>
          <h1 className="text-2xl font-bold">{site.name}</h1>
          <a
            href={fullDomain}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-primary hover:underline"
          >
            {site.subdomain}.m3ntha.ch
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>

        <span
          className={cn(
            "rounded-md px-2 py-1 text-sm",
            statusMap[site.status as SiteStatus],
          )}
        >
          {site.status}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border pb-2">
        {TABS.map((t) => (
          <button
            key={t}
            className={cn(
              "text-sm font-medium transition-colors",
              t === tab
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground",
            )}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {tab === "Pages" && (
          <div className="text-muted-foreground text-sm">
            Page management coming soon…
          </div>
        )}

        {tab === "Settings" && (
          <div className="max-w-xl space-y-6">
            {/* Formulaire d’édition */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Site Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="My Portfolio"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Subdomain</label>
                <Input value={site.subdomain} disabled />
                <p className="text-muted-foreground text-xs">
                  Custom domains coming soon. Upgrade your plan to unlock this
                  feature.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as SiteStatus)}
                  className="bg-background text-foreground w-full rounded-md border px-3 py-2 text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <Button
                onClick={handleUpdate}
                disabled={saving || !name}
                className="w-full sm:w-auto"
              >
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>

            {/* Danger Zone */}
            <div className="border-t border-border pt-6">
              <p className="text-muted-foreground mb-2 text-sm">Danger zone</p>
              <Button variant="secondary" onClick={handleDelete}>
                Delete this site
              </Button>
            </div>
          </div>
        )}

        {tab === "Analytics" && (
          <div className="text-muted-foreground text-sm">
            Analytics placeholder
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteDetailPage;
