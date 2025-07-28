"use client";

import React, { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { useLoader } from "@/contexts/LoaderContext";
import { useError } from "@/contexts/ErrorContext";
import { useAlert } from "@/hooks/useAlert";
import { useRouter } from "next/navigation";
import Button from "../common/Button";
import { AnimatePresence, motion } from "framer-motion";
import InputField from "../common/InputField";

const ForgotPasswordForm = () => {
  const { forgotUserPassword } = useUser();
  const { setLoading } = useLoader();
  const { setError } = useError();
  const { showAlert } = useAlert();
  const [email, setEmail] = useState("");
  const [sent, isSent] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotUserPassword(email);
      isSent(true);
      showAlert({
        type: "success",
        title: "Check your email!",
        message: "A password reset link has been sent to your email.",
        duration: 2000,
        position: "top-right",
      });
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
          Forgot your password?
        </h2>
        {sent ? (
          <div className="mb-4 flex flex-col justify-center">
            <p className="text-text">
              A mail has been sent if the email is registered.
            </p>
            <p className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-primary transition-colors duration-200 hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" className="w-full">
              Reset Password
            </Button>
          </form>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ForgotPasswordForm;
