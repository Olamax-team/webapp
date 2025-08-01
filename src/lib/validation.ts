import { z } from 'zod';

const requiredString = z.string().trim().min(1, 'Required field');

const auth = z.object({
  email: requiredString.email('Invalid email address'),
  password: requiredString,
  referralCode: z.string().optional().or(z.literal('')),
  verificationCode: requiredString,
  emailAuth: requiredString,
  newAuthApp: requiredString,
  currentPassword: requiredString,
  newPassword: requiredString,
  confirmPassword: requiredString,
  emailOtp: requiredString,
});

export const loginSchema = auth.pick({ email: true, password: true });
export type loginValues = z.infer<typeof loginSchema>;

export const signupSchema = auth.pick({ email: true, password: true, referralCode: true });
export type signUpValues = z.infer<typeof signupSchema>;

export const recoverySchema = auth.pick({ email: true });
export type recoveryValues = z.infer<typeof recoverySchema>;

export const verficationSchema = auth.pick({ verificationCode: true });
export type verficationValues = z.infer<typeof verficationSchema>;

export const securityAuthSchema = auth.pick({ emailAuth: true, newAuthApp: true});
export type securityAuthValues = z.infer<typeof securityAuthSchema>;

export const changePasswordSchema = auth.pick({currentPassword: true, newPassword: true, confirmPassword: true});
export type changePasswordValues = z.infer<typeof changePasswordSchema>;

export const passwordRecoverySchema = auth.pick({emailOtp: true, newPassword: true, confirmPassword: true});
export type passwordRecoveryValues = z.infer<typeof passwordRecoverySchema>;

