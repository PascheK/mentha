// components/login/LoginForm.tsx
"use client";

import AuthForm from "./AuthForm";
import { useUser } from "@/context/UserContext";

export default function LoginForm() {
  const { login } = useUser();
  return <AuthForm onSubmit={({ email, password }) => login(email, password)} isLogin />;
}
