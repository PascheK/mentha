import { createAuthClient } from "better-auth/react";

export const {
  signIn,
  signUp,
  signOut,
  useSession,
} = createAuthClient({
  baseURL: "http://localhost:3000", // ou ton domaine en prod
});
