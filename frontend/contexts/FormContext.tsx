'use client';
import React, { createContext, useContext, useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  photo?: string;
  email: string;
  phoneNumber?: string;
  newsletterSubscribed: boolean;
  line1: string;
  line2?: string;
  postalCode: string;
  city: string;
  country: string;
  password: string;
  termsAccepted: boolean;
}

const defaultData: FormData = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phoneNumber: '',
  newsletterSubscribed: false,
  line1: '',
  line2: '',
  postalCode: '',
  city: '',
  country: '',
  password: '',
  termsAccepted: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormContext = createContext<any>(null);

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(defaultData);

  const updateForm = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <FormContext.Provider value={{ step, setStep, formData, updateForm }}>
      {children}
    </FormContext.Provider>
  );
};