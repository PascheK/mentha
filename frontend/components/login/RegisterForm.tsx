"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useTheme } from "@/context/ThemeContext";
import { useLoader } from "@/context/LoaderContext";
import { useError } from "@/context/ErrorContext";
import PasswordInput from "../common/PasswordInput";
import ImageUploader from "../common/ImageUploader";
import CheckboxField from "../common/CheckboxField";
import InputField from "../common/InputField";
import { useAlert } from "@/hooks/useAlert";
import { isApiSuccess } from "@/utils/isApiSuccess";

type RegisterFormFields = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture: File | null;
  termsAccepted: boolean;
};

const RegisterForm = () => {
  const { register } = useUser();
  const { theme } = useTheme();
  const { setLoading } = useLoader();
  const { setError } = useError();
  const { showAlert } = useAlert();
  const router = useRouter();

  const [form, setForm] = useState<RegisterFormFields>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
    termsAccepted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setForm((prev) => ({ ...prev, profilePicture: files?.[0] || null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.termsAccepted) {
      setError("You must accept the terms and conditions.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      let profileUrl = "";

      if (form.profilePicture) {
        const formData = new FormData();
        formData.append("image", form.profilePicture);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploads`, {
          method: "POST",
          body: formData,
        });
        
        
        if (!res.ok) throw new Error("Image upload failed");
        const data = await res.json();
        profileUrl = data.data.path;
      }

      const registerRes = await register(
        form.firstName,
        form.lastName,
        form.username,
        form.email,
        form.password,
        profileUrl,
        form.termsAccepted
      );
      

      if (!isApiSuccess(registerRes)) {
        throw new Error(registerRes.error.message);
      }

      showAlert({
        type: "success",
        title: "Account Created!",
        message: "A verification email has been sent to your inbox. Please check it to activate your account.",
        duration: 3000,
        position: "top-right",
      });

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-w-md w-full mx-auto mt-10 p-8 rounded-2xl shadow-lg border ${
        theme === "dark"
          ? "bg-gray-900 border-gray-700 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="First Name"
          name="firstName"
          type="text"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <InputField
          label="Last Name"
          name="lastName"
          type="text"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <InputField
          label="Username"
          name="username"
          type="text"
          value={form.username}
          onChange={handleChange}
          required
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <PasswordInput
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          showStrength
          required
        />
        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <ImageUploader
          name="profilePicture"
          label="Profile Picture"
          onChange={(file) =>
            setForm((prev) => ({ ...prev, profilePicture: file }))
          }
        />
        <CheckboxField
          name="termsAccepted"
          label="I accept the Terms and Conditions"
          checked={form.termsAccepted}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full p-3 mt-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <button
          onClick={() => router.push("/login")}
          className="text-blue-500 hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
