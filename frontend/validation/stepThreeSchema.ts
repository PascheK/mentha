import { z } from 'zod';

export const stepThreeSchema = z.object({
  line1: z.string().min(3, 'Address line is required'),
  line2: z.string().optional(),
  postalCode: z.string().min(2, 'Postal code required'),
  city: z.string().min(2, 'City required'),
  country: z.string().min(1, 'Country required'),
});


export type StepThreeData = z.infer<typeof stepThreeSchema>;
