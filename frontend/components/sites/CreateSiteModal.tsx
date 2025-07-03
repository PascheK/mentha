// src/components/sites/CreateSiteModal.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "@/components/common/Button";
import { useLoader } from "@/contexts/LoaderContext";
import { useAlert } from "@/hooks/useAlert";
import { createSite } from "@/lib/site/api";
import { isApiSuccess } from "@/utils/isApiSuccess";
import Input from "../common/Input";

import { useUser } from "@/contexts/UserContext";
interface CreateSiteModalProps {
  open: boolean;
  onClose: () => void;
  refreshSites: () => Promise<void>; // 👈 nouvelle prop
}

const CreateSiteModal: React.FC<CreateSiteModalProps> = ({
  open,
  onClose,
  refreshSites,
}) => {
  const { user, refreshUser } = useUser();
  const { setLoading } = useLoader();
  const { showAlert } = useAlert();

  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!name || !domain) return;

    const isValidDomain = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/.test(domain);
    if (!isValidDomain) {
      showAlert({
        type: "error",
        message: "Invalid domain format",
        title: "",
      });
      return;
    }

    setSubmitting(true);
    setLoading(true);

    const res = await createSite({ name, domain });

    if (isApiSuccess(res)) {
      showAlert({
        type: "success",
        message: "Site created!",
        title: "",
      });
      await refreshUser();
      await refreshSites(); // 👈 re-fetch les sites
      onClose(); // 👈 ferme le modal
    } else {
      showAlert({
        type: "error",
        message: res.error?.message || "Error creating site",
        title: "",
      });
    }

    setSubmitting(false);
    setLoading(false);
  };

  const maxReached = !!(
    user && user.sites.length >= user.subscription.maxSites
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X size={20} />
            </button>

            <h2 className="mb-4 text-xl font-semibold">Create a new site</h2>

            <div className="space-y-4">
              <Input
                label="Site Name"
                placeholder="e.g. My Portfolio"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                label="Domain"
                placeholder="e.g. mysite.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </div>

            <Button
              className="mt-6 w-full"
              onClick={handleCreate}
              disabled={submitting || maxReached}
            >
              {maxReached ? "Site limit reached" : "Create Site"}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateSiteModal;
