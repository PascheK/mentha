"use client";
import React from "react";
import Input from "@/components/common/Input";
import Checkbox from "@/components/common/Checkbox";
import { useFormContext } from "@/contexts/FormContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepTwoSchema, StepTwoData } from "@/validation/stepTwoSchema";
import Button from "@/components/common/Button";
import PhoneInput from "@/components/common/PhoneInput";

const StepTwo = () => {
  const { formData, updateForm, setStep } = useFormContext();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StepTwoData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      email: formData.email,
      phoneNumber: formData.phoneNumber || "",
      newsletterSubscribed: formData.newsletterSubscribed,
    },
  });

  const onSubmit = (data: StepTwoData) => {
    updateForm(data);
    setStep((prev: number) => prev + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email"
        {...register("email")}
        error={errors.email?.message}
      />

      <PhoneInput
        label="Phone Number"
        value={watch("phoneNumber")}
        onChange={(val) => setValue("phoneNumber", val)}
        error={errors.phoneNumber?.message}
      />

      <Checkbox
        label="Subscribe to newsletter"
        checked={watch("newsletterSubscribed")}
        onChange={(e) => setValue("newsletterSubscribed", e.target.checked)}
      />

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setStep((prev: number) => prev - 1)}
        >
          Previous
        </Button>

        <Button type="submit" variant="primary">
          Next
        </Button>
      </div>
    </form>
  );
};

export default StepTwo;
