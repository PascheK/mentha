// src/hooks/useSite.ts
import { useEffect, useState, useCallback } from 'react';
import { getSiteById } from '@/lib/siteActions'; // à créer
import { Site } from '@/types/site';
import { isApiSuccess } from '@/utils/isApiSuccess';
import { useLoader } from '@/contexts/LoaderContext';

export const useSite = (id: string) => {
  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { setLoading: setGlobalLoading } = useLoader();

  const refreshSite = useCallback(async () => {
    setLoading(true);
    setGlobalLoading(true);

    const res = await getSiteById(id);

    if (isApiSuccess<Site>(res)) {
      setSite(res.data);
      setError(null);
    } else {
      setSite(null);
      setError(res.error?.message || 'Failed to fetch site');
    }

    setGlobalLoading(false);
    setLoading(false);
  }, [id, setGlobalLoading]);

  useEffect(() => {
    if (id) refreshSite();
  }, [refreshSite]);

  return { site, loading, error, refreshSite };
};
