// app/dashboard/profile/page.tsx
"use client";

import ProfileCompletionCard from "@/components/dashboard/profile/ProfileCompletionCard";
import ProfileOverviewCard from "@/components/dashboard/profile/ProfileOverviewCard";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="mx-auto w-full space-y-8 p-6">
      {/* Informations de profil */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Your Information</h2>
        <div className="mx-auto grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <ProfileOverviewCard />
          <ProfileCompletionCard />
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
