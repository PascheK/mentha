// components/login/AuthForm.tsx
"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useError } from "@/context/ErrorContext";

interface AuthFormProps {
  onSubmit: (formData: { name?: string; email: string; password: string }) => Promise<void>;
  isLogin?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isLogin = true }) => {
  const { theme } = useTheme();
  const { setError } = useError();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ name, email, password });
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-w-md w-full mx-auto mt-10 rounded-2xl p-8 shadow-xl border ${
        theme === "dark"
          ? "bg-gray-900 border-gray-700 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? "Sign In" : "Create an Account"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 mt-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;