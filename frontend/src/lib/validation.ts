import { z } from 'zod';

const requiredString = z.string().trim().min(1, 'Required field');

export const loginSchema = z.object({
  email: requiredString.email('Invalid email address'),
  password: requiredString,
});

export type loginValues = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  email: requiredString.email('Invalid email address'),
  password: requiredString,
  referralCode: z.string().optional().or(z.literal('')),
});

export type signUpValues = z.infer<typeof signupSchema>;