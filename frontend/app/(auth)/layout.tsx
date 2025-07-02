// app/(auth)/layout.tsx
"use client";


import ThemeToggle from "@/components/common/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";
import "@/styles/globals.css"; 

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <main className="w-full px-4">{children}</main>
    </div>
  );
}

