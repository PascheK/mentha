// components/login/SignupForm.tsx
"use client";

import AuthForm from "./AuthForm";
import { useUser } from "@/context/UserContext";

export default function SignupForm() {
  const { register } = useUser();
  return <AuthForm onSubmit={({ name, email, password }) => register(name!, email, password)} isLogin={false} />;
}
