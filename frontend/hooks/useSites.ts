// src/hooks/useSites.ts
import { useEffect, useState, useCallback } from 'react';
import { getSites } from '@/lib/siteActions';
import { Site } from '@/types/site';
import { isApiSuccess } from '@/utils/isApiSuccess';
import { useLoader } from '@/contexts/LoaderContext';

export const useSites = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLocalLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { setLoading: setGlobalLoading } = useLoader();

  // 🔁 Fonction publique pour re-fetch les sites manuellement
  const refreshSites = useCallback(async () => {
    setLocalLoading(true);
    setGlobalLoading(true);

    const res = await getSites();

    if (isApiSuccess<Site[]>(res)) {
      setSites(res.data);
      setError(null);
    } else {
      setError(res.error.message || 'Failed to fetch sites');
    }

    setGlobalLoading(false);
    setLocalLoading(false);
  }, [setGlobalLoading]);

  // Chargement initial
  useEffect(() => {
    refreshSites();
  }, [refreshSites]);

  return {
    sites,
    loading,
    error,
    refreshSites, // 👈 exporté ici
  };
};
