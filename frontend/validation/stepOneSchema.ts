// validation/stepOneSchema.ts
import { z } from 'zod';

export const stepOneSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  photo: z.string().optional(),
});

export type StepOneData = z.infer<typeof stepOneSchema>;
