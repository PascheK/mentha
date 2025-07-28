"use client";
import React from "react";
import Input from "@/components/common/Input";
import ImageUploader from "@/components/common/ImageUploader";
import { useFormContext } from "@/contexts/FormContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepOneSchema, StepOneData } from "@/validation/stepOneSchema";
import Button from "@/components/common/Button";
import { useError } from "@/contexts/ErrorContext";
import { useLoader } from "@/contexts/LoaderContext";

const StepOne = () => {
  const { formData, updateForm, setStep } = useFormContext();
  const { setLoading } = useLoader();
  const { setError } = useError();
  const [profilePicture, setProfilePicture] = React.useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepOneData>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      photo: formData.photo || "",
    },
  });

  const onSubmit = async (data: StepOneData) => {
    setLoading(true);
    try {
      if (profilePicture) {
        const formData = new FormData();
        formData.append("image", profilePicture);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/uploads`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Image upload failed");
        const dataRes = await res.json();
        data.photo = dataRes.data.path;
      }

      updateForm(data);
      setStep((prev: number) => prev + 1);
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ImageUploader
        name="photo"
        label="Profile Photo"
        defaultImage={formData.photo}
        onChange={(file) => {
          setProfilePicture(file);
        }}
      />

      <Input
        label="First Name"
        {...register("firstName")}
        error={errors.firstName?.message}
      />
      <Input
        label="Last Name"
        {...register("lastName")}
        error={errors.lastName?.message}
      />
      <Input
        label="Username"
        {...register("username")}
        error={errors.username?.message}
      />

      <div className="flex justify-end pt-4">
        <Button type="submit" variant="primary">
          Next
        </Button>
      </div>
    </form>
  );
};

export default StepOne;
