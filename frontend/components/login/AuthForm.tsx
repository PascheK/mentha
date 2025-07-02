import React from 'react'
import MultiStepRegisterForm from './MultiStepRegisterForm';
import LoginForm from './LoginForm';
type FormType = "register" | "login";
function AuthForm({ type }: { type: FormType }) {
  return (
   <>
    {type === "register" ? (
      <MultiStepRegisterForm />
    ) : (
      <LoginForm />
    )}
   </>
  )
}

export default AuthForm