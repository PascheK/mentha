"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useError } from "@/context/ErrorContext";
import { useUser } from "@/context/UserContext";
import { verifyEmail } from "@/lib/user/api"; // adapte selon ton arborescence
import { ApiResponse } from "@/types/api";

const VerifyEmailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { setError } = useError();
  const { loginFromToken } = useUser();

  const token = typeof params?.token === "string" ? params.token : "";
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      const res: ApiResponse<string> = await verifyEmail(token);

      if ("error" in res) {
        setStatus("error");
        setError(res.error.message || "Email verification failed");
        return;
      }

      // sinon tout s’est bien passé
      await loginFromToken(res.data); // facultatif selon backend
      setStatus("success");
      setTimeout(() => router.push("/dashboard"), 2000);
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {status === "verifying" && (
        <p className="text-lg font-medium animate-pulse text-blue-500">Verifying your email...</p>
      )}
      {status === "success" && (
        <p className="text-green-500 text-xl font-semibold">✅ Your email has been verified!</p>
      )}
      {status === "error" && (
        <p className="text-red-500 text-xl font-semibold">❌ Verification failed. Please try again.</p>
      )}
    </div>
  );
};

export default VerifyEmailPage;
