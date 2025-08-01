// components/common/UserAvatar.tsx
"use client";

import Image from "next/image";
import React from "react";
import { cn } from "@/utils/cn";

interface UserAvatarProps {
  src?: string | null;
  alt?: string;
  size?: number;
  className?: string;
}

const DEFAULT_AVATAR = "/default-avatar.png";
const EXPRESS_BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL || "https://api.m3ntha.ch"
    : process.env.NEXT_PUBLIC_API_URL_DEV || "http://localhost:5000";

const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  alt = "User Avatar",
  size = 40,
  className = "",
}) => {
  const imageSrc = src ? `${EXPRESS_BASE_URL}${src}` : DEFAULT_AVATAR;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={size}
      height={size}
      className={cn(`mx-auto rounded-full object-cover`, className)}
    />
  );
};

export default UserAvatar;
