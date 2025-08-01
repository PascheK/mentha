"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { useLoader } from "@/contexts/LoaderContext";
import { useError } from "@/contexts/ErrorContext";
import { useAlert } from "@/hooks/useAlert";
import InputField from "../common/InputField";
import CheckboxField from "../common/CheckboxField";
import PasswordInput from "../common/PasswordInput";
import Button from "../common/Button";
import { AnimatePresence, motion } from "framer-motion";

const LoginForm = () => {
  const { login } = useUser();
  const { setLoading } = useLoader();
  const { setError } = useError();
  const { showAlert } = useAlert();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loginRes = await login(email, password, staySignedIn);
      if (!loginRes.success) {
        setError(loginRes.error?.message || "Login failed");
        return;
      }
      showAlert({
        type: "success",
        title: "Welcome back!",
        message: "You have successfully logged in.",
        duration: 2000,
        position: "top-right",
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
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
        <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <PasswordInput
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <CheckboxField
            name="staySignedIn"
            label="Stay signed in"
            checked={staySignedIn}
            onChange={(e) => setStaySignedIn(e.target.checked)}
          />
          <Button type="submit" variant="primary" className="w-full">
            Sign In
          </Button>
        </form>
        <p className="mt-4 text-center text-sm">
          Forgot your password?{" "}
          <button
            onClick={() => router.push("/forgot-password")}
            className="text-primary transition-colors duration-200 hover:underline"
          >
            Reset it
          </button>
        </p>
        <p className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-primary transition-colors duration-200 hover:underline"
          >
            Register
          </button>
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginForm;
