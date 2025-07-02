'use client';
import React, { useEffect, useState } from 'react';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StepThreeData, stepThreeSchema } from '@/validation/stepThreeSchema';
import { useFormContext } from '@/contexts/FormContext';
import Button from '@/components/common/Button';

const StepThree = () => {
  const { formData, updateForm, setStep } = useFormContext();
  const [countries, setCountries] = useState<{ label: string; value: string }[]>([]);
  const [addressVerified, setAddressVerified] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StepThreeData>({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: {
      line1: formData.line1,
      line2: formData.line2,
      postalCode: formData.postalCode,
      city: formData.city,
      country: formData.country,
    },
  });

  // Charger dynamiquement les pays depuis REST Countries
  useEffect(() => {
  const fetchCountries = async () => {
    const res = await fetch("https://restcountries.com/v3.1/all?fields=name");

    const data: { name: { common: string } }[] = await res.json();

    const countryOptions = data
      .map((c) => ({
        label: c.name.common,
        value: c.name.common,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    setCountries(countryOptions);
  };

  fetchCountries();
}, []);

  const validateAddress = async (
    line1: string,
    postalCode: string,
    city: string,
    country: string
  ): Promise<boolean> => {
    const query = `${line1}, ${postalCode}, ${city}, ${country}`;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`;

    try {
      const res = await fetch(url, {
        headers: { 'Accept-Language': 'en' },
      });
      const data = await res.json();
      return data.length > 0;
    } catch (error) {
      console.error('Address validation failed', error);
      return false;
    }
  };

  const onSubmit = async (data: StepThreeData) => {
    const valid = await validateAddress(data.line1, data.postalCode, data.city, data.country);
    setAddressVerified(valid);

    if (valid) {
      updateForm(data);
      setStep((prev: number) => prev + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Address Line 1"
        {...register('line1')}
        error={errors.line1?.message}
      />
      <Input
        label="Address Line 2"
        {...register('line2')}
        error={errors.line2?.message}
      />
      <Input
        label="Postal Code"
        {...register('postalCode')}
        error={errors.postalCode?.message}
      />
      <Input
        label="City"
        {...register('city')}
        error={errors.city?.message}
      />
      <Select
        label="Country"
        options={countries}
        value={formData.country}
        onChange={(e) => {
          setValue('country', e.target.value);
          updateForm({ country: e.target.value });
        }}
      />
      {addressVerified === false && (
        <p className="text-sm text-red-500">
          ⚠️ Address not found. Please double-check your inputs.
        </p>
      )}

      <div className="flex justify-between pt-4">
        <Button type="button" variant="ghost" onClick={() => setStep((prev: number) => prev - 1)}>
          Previous
        </Button>
        <Button type="submit" variant="primary">
          Next
        </Button>
      </div>
    </form>
  );
};

export default StepThree;
