"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLoader } from "@/contexts/LoaderContext";
import { useError } from "@/contexts/ErrorContext";
import { useAlert } from "@/hooks/useAlert";
import InputField from "../common/InputField";
import CheckboxField from "../common/CheckboxField";
import PasswordInput from "../common/PasswordInput";
import Button from "../common/Button";
import { motion } from "framer-motion";

const LoginForm = () => {
  const { login } = useUser();
  const { theme } = useTheme();
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`max-w-md mx-auto mt-10 p-8 rounded-2xl shadow-lg border backdrop-blur-md ${{
        dark: "bg-white/5 border-gray-700 text-white",
        light: "bg-white/80 border-gray-200 text-gray-900",
      }[theme]}`}
    >
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
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

      <p className="text-center mt-4 text-sm">
        Don&apos;t have an account?{' '}
        <button
          onClick={() => router.push("/register")}
          className="text-blue-500 hover:underline transition-colors duration-200"
        >
          Register
        </button>
      </p>
    </motion.div>
  );
};

export default LoginForm;
