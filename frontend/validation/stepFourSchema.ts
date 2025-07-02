// validation/stepFourSchema.ts
import { z } from 'zod';

export const stepFourSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(/[A-Z]/, 'Password must contain an uppercase letter')
      .regex(/\d/, 'Password must contain a number'),
    confirmPassword: z.string(),
    termsAccepted: z.boolean().refine(val => val === true, {
      message: 'You must accept the terms',
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type StepFourData = z.infer<typeof stepFourSchema>;
