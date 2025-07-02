// validation/stepTwoSchema.ts
import { z } from 'zod';

export const stepTwoSchema = z.object({
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().optional(),
  newsletterSubscribed: z.boolean(),
});

export type StepTwoData = z.infer<typeof stepTwoSchema>;
