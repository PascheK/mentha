'use client';
import React from 'react';
import Checkbox from '@/components/common/Checkbox';
import PasswordInput from '@/components/common/PasswordInput';
import { useFormContext } from '@/contexts/FormContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepFourSchema, StepFourData } from '@/validation/stepFourSchema';
import Button from '@/components/common/Button';

const StepFour = () => {
  const { formData, updateForm, setStep } = useFormContext();

  const {
    
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StepFourData>({
    resolver: zodResolver(stepFourSchema),
    defaultValues: {
      password: formData.password,
      confirmPassword: '',
      termsAccepted: formData.termsAccepted,
    },
  });

  const onSubmit = (data: StepFourData) => {
    updateForm({
      password: data.password,
      termsAccepted: data.termsAccepted,
    });
    setStep((prev: number) => prev + 1); // ou envoi backend plus tard
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <PasswordInput
        label="Password"
        name="password"
        value={watch('password')}
        onChange={(e) => setValue('password', e.target.value)}
        showStrength
      />
      {errors.password && (
        <p className="text-sm text-red-500">{errors.password.message}</p>
      )}

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={watch('confirmPassword')}
        onChange={(e) => setValue('confirmPassword', e.target.value)}
      />
      {errors.confirmPassword && (
        <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
      )}

      <Checkbox
        label="I accept the terms and conditions"
        checked={watch('termsAccepted')}
        onChange={(e) => setValue('termsAccepted', e.target.checked)}
      />
      {errors.termsAccepted && (
        <p className="text-sm text-red-500">{errors.termsAccepted.message}</p>
      )}

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

export default StepFour;
