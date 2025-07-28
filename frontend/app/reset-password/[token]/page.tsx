"use client";

import { useParams } from "next/navigation";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

const ResetPasswordPage = () => {
  const params = useParams() as { token: string }; // ✅ Typage explicite

  const token = params.token;

  if (!token) return null; // 🔄 Rends `null` au lieu de rien

  return <ResetPasswordForm token={token} />;
};

export default ResetPasswordPage;
