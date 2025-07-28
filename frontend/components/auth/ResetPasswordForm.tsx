"use client";

import React, { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { useLoader } from "@/contexts/LoaderContext";
import { useError } from "@/contexts/ErrorContext";
import { useAlert } from "@/hooks/useAlert";
import { useRouter } from "next/navigation";
import Button from "../common/Button";
import { AnimatePresence, motion } from "framer-motion";
import PasswordInput from "../common/PasswordInput";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const { resetUserPassword } = useUser();
  const { setLoading } = useLoader();
  const { setError } = useError();
  const { showAlert } = useAlert();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (token.length === 0) {
        setError("Invalid token");
        return;
      }
      const res = await resetUserPassword(token, newPassword);
      if (!res.success) {
        setError(res.error.message || "Failed to reset password");
        return;
      }

      showAlert({
        type: "success",
        title: "Password Reset Successful",
        message: "Your password has been reset successfully.",
        duration: 2000,
        position: "top-right",
      });
      router.push("/login");
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="mx-auto mt-10 max-w-md rounded-2xl border border-border bg-bg/80 p-8 text-text shadow-lg backdrop-blur-md"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">
          Reset your password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <PasswordInput
            label="Password"
            name="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            showStrength
          />
          <PasswordInput
            label="New Password"
            name="newPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" className="w-full">
            Reset Password
          </Button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResetPasswordForm;
