"use client";

import { useUser } from "@/contexts/UserContext";
import UserAvatar from "@/components/common/UserAvatar";

export default function UserProfileCard() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <section className="mx-auto w-full max-w-3xl rounded-2xl border bg-bg p-6 text-text shadow-md">
      <div className="flex flex-col items-center gap-5">
        <UserAvatar
          src={user?.photo}
          alt={`${user.firstName} ${user.lastName}`}
          size={80}
        />
        <div>
          <h2 className="text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-placeholder">@{user.username}</p>
        </div>
      </div>

      <div className="mt-6 space-y-2 text-sm">
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-medium">Phone:</span>{" "}
          {user.phoneNumber || "Not provided"}
        </p>
      </div>
    </section>
  );
}
