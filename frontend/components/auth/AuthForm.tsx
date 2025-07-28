import React from "react";
import MultiStepRegisterForm from "./MultiStepRegisterForm";
import LoginForm from "./LoginForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
type FormType = "register" | "login" | "forgot-password";
function AuthForm({ type }: { type: FormType }) {
  return (
    <>
      {type === "register" ? (
        <MultiStepRegisterForm />
      ) : type === "forgot-password" ? (
        <ForgotPasswordForm />
      ) : (
        <LoginForm />
      )}
    </>
  );
}

export default AuthForm;
