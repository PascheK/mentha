"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useTheme } from "@/context/ThemeContext";
import { useLoader } from "@/context/LoaderContext";
import { useError } from "@/context/ErrorContext";

const LoginForm = () => {
  const { login } = useUser();
  const { theme } = useTheme();
  const { setLoading } = useLoader();
  const { setError } = useError();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password, staySignedIn);
      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-w-md mx-auto mt-10 p-8 rounded-2xl shadow-lg border ${
        theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-600"
        />
        <label className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            checked={staySignedIn}
            onChange={(e) => setStaySignedIn(e.target.checked)}
          />
          <span>Stay signed in</span>
        </label>
        <button type="submit" className="w-full p-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">
          Sign In
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        Don&apos;t have an account?{" "}
        <button onClick={() => router.push("/register")} className="text-blue-500 hover:underline">
          Register
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
