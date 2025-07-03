"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/contexts/FormContext";
import Button from "@/components/common/Button";
import InfoRow from "@/components/common/InfoRow";
import UserAvatar from "@/components/common/UserAvatar";
import { useUser } from "@/contexts/UserContext";
import { isApiSuccess } from "@/utils/isApiSuccess";
import { useError } from "@/contexts/ErrorContext";
import { useLoader } from "@/contexts/LoaderContext";
import { useAlert } from "@/hooks/useAlert";
const StepFive = () => {
  const { formData, setStep } = useFormContext();
  const { register } = useUser();
  const { setLoading } = useLoader();
  const { setError } = useError();
  const { showAlert } = useAlert();
  const router = useRouter();

  const {
    photo,
    firstName,
    lastName,
    username,
    email,
    phoneNumber,
    newsletterSubscribed,
    line1,
    line2,
    postalCode,
    city,
    country,
    termsAccepted,
  } = formData;

  const onSubmit = async () => {
    try {
      setLoading(true);
      const registerRes = await register(
        formData.firstName,
        formData.lastName,
        formData.username,
        formData.email,
        formData.password,
        formData.photo,
        formData.phoneNumber,
        formData.newsletterSubscribed,
        formData.line1,
        formData.line2,
        formData.postalCode,
        formData.city,
        formData.country,
        formData.termsAccepted,
      );

      if (!isApiSuccess(registerRes)) {
        throw new Error(registerRes.error.message);
      }
      showAlert({
        type: "success",
        title: "Account Created!",
        message:
          "A verification email has been sent to your inbox. Please check it to activate your account.",
        duration: 3000,
        position: "top-right",
      });
      router.push("/login");
    } catch (error: unknown) {
      const err = error as { message?: string };
      setError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-center text-2xl font-bold text-primary">
        🔍 Review Your Information
      </h2>

      <div className="flex flex-col items-center">
        <UserAvatar
          src={photo}
          alt={`${firstName} ${lastName}`}
          size={80}
          className=""
        />
        <p className="mt-2 text-sm text-placeholder">Profile Photo</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="flex-1 rounded-xl bg-bg/10 p-4 shadow backdrop-blur-md dark:bg-bg/5">
            <h3 className="mb-2 text-lg font-semibold text-primary">
              🧑 Identity
            </h3>
            <InfoRow label="First Name" value={firstName} />
            <InfoRow label="Last Name" value={lastName} />
            <InfoRow label="Username" value={username} />
          </div>

          <div className="flex-1 rounded-xl bg-bg/10 p-4 shadow backdrop-blur-md dark:bg-bg/5">
            <h3 className="mb-2 text-lg font-semibold text-primary">
              📬 Contact
            </h3>
            <InfoRow label="Email" value={email} />
            <InfoRow label="Phone Number" value={phoneNumber} />
            <InfoRow
              label="Newsletter"
              value={newsletterSubscribed ? "Yes" : "No"}
            />
          </div>
        </div>

        <div className="rounded-xl bg-bg/10 p-4 shadow backdrop-blur-md dark:bg-bg/5">
          <h3 className="mb-2 text-lg font-semibold text-primary">
            🏠 Address
          </h3>
          <InfoRow label="Line 1" value={line1} />
          {line2 && <InfoRow label="Line 2" value={line2} />}
          <InfoRow label="Postal Code" value={postalCode} />
          <InfoRow label="City" value={city} />
          <InfoRow label="Country" value={country} />
        </div>

        <div className="text-center">
          <p className="text-sm text-placeholder">
            Terms Accepted: {termsAccepted ? "✅ Yes" : "❌ No"}
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setStep((prev: number) => prev - 1)}
        >
          Previous
        </Button>

        <Button type="submit" variant="success" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default StepFive;
