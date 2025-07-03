"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { useAlert } from "@/hooks/useAlert";
import { verifyEmail } from "@/lib/user/api";
import { isApiSuccess } from "@/utils/isApiSuccess";

import { Loader2, CheckCircle, XCircle, ArrowRight } from "lucide-react";

const VerifyEmailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { loginFromToken } = useUser();
  const { showAlert } = useAlert();

  const token = typeof params?.token === "string" ? params.token : "";
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      const res = await verifyEmail(token);

      if (!isApiSuccess(res)) {
        setStatus("error");

        showAlert({
          type: "error",
          title: "Verification failed",
          message: res.error.message || "Invalid or expired token.",
          duration: 8000,
          position: "top-right",
        });

        return;
      }

      await loginFromToken(res.data);

      showAlert({
        type: "success",
        title: "Email verified",
        message: "Welcome to m3ntha. Redirecting you to your dashboard...",
        duration: 5000,
        position: "top-right",
      });

      setStatus("success");
      setTimeout(() => router.push("/dashboard"), 3000);
    };

    verify();
  }, [token, loginFromToken, router, showAlert]);

  const renderContent = () => {
    switch (status) {
      case "verifying":
        return (
          <>
            <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-primary">
              Verifying email...
            </h2>
            <p className="text-sm text-placeholder mt-1">
              Please wait while we confirm your email address.
            </p>
          </>
        );

      case "success":
        return (
          <>
            <CheckCircle className="w-10 h-10 text-success mx-auto mb-3 animate-fade-in" />
            <h2 className="text-lg font-semibold text-success">
              Email verified successfully!
            </h2>
            <p className="text-sm text-placeholder mt-1">
              You will be redirected shortly.
            </p>
          </>
        );

      case "error":
        return (
          <>
            <XCircle className="w-10 h-10 text-error mx-auto mb-3 animate-fade-in" />
            <h2 className="text-lg font-semibold text-error">
              Verification failed.
            </h2>
            <p className="text-sm text-placeholder mt-1">
              The link is invalid or expired.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              Go to login <ArrowRight className="w-4 h-4" />
            </button>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 animate-fade-in">
      <div className="max-w-md w-full text-center p-6 border rounded-xl shadow-lg bg-bg border-border">
        {renderContent()}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
