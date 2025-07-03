// app/(auth)/layout.tsx
"use client";


import ThemeToggle from "@/components/common/ThemeToggle";
import "@/styles/globals.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-bg text-text"
    >
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <main className="w-full px-4">{children}</main>
    </div>
  );
}

