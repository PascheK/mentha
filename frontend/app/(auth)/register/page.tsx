// app/(auth)/signup/page.tsx

import AuthForm from "@/components/auth/AuthForm";
import { FormProvider } from "@/contexts/FormContext";

export default function SignupPage() {
  return (
    <FormProvider>
      <AuthForm type="register" />
    </FormProvider>
  );
}
