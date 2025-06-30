// components/common/GlobalLoader.tsx
"use client";

import { useLoader } from "@/context/LoaderContext";

export const GlobalLoader = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="h-16 w-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  );
};
