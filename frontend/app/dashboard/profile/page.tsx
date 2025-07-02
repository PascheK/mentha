// app/dashboard/profile/page.tsx
"use client";

import React from "react";
import ProfileForm from "@/components/dashboard/profile/ProfileForm";
import ChangePasswordForm from "@/components/dashboard/profile/ChangePasswordForm";

const ProfilePage = () => {
  return (
    <div className="space-y-10 max-w-3xl">
      {/* Informations de profil */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Your Information</h2>
        <ProfileForm />
      </section>

      {/* Mot de passe */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <ChangePasswordForm />
      </section>
    </div>
  );
};

export default ProfilePage;
