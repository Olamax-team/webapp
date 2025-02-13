import { z } from 'zod';

export const formValidationSchema = z.object({
  inputAmount: z
    .string()
    .min(1, 'Required field')
    .regex(/^[0-9]+(\.[0-9]{1,2})?$/, 'Invalid amount')
    .refine(val => parseFloat(val) >= 1, { message: 'Amount must be at least 1' }),

    paymentAmount: z
    .string()
    .min(1, 'Payment amount is required')
    .refine(val => parseFloat(val) >= 0.01, { message: 'Payment amount must be at least 0.01' }),

   
});
    export const billsSchema = z.object({
      billType: z
        .string()
        .refine(val => ['prepaid', 'postpaid'].includes(val), {
          message: 'Invalid selection, please choose either Prepaid or Postpaid',
        }),


        phoneNumber: z
        .string()
        .regex(/^[0-9]+$/, 'Required field')
        .max(15, 'Phone number cannot exceed 15 digits')
        .min(10, 'Phone number cannot be less than 10 digits'),


        meterNumber: z
        .string()
        .regex(/^[0-9]+$/, 'Required field') 
        .max(11, 'Meter number cannot exceed 11 digits')
        .min(10, 'Meter number cannot be less than 10 digits')

    })



