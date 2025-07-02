
// app/dashboard/sites/[id]/page.tsx
"use client";

interface SitePageProps {
  params: { id: string };
}

const SitePage = ({ params }: SitePageProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Gestion du site {params.id}</h1>
      {/* <PageList siteId={params.id} /> */}
    </div>
  );
};

export default SitePage;