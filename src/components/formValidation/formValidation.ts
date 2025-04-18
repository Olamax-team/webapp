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
        

        meterNumber: z
        .string()
        .regex(/^[0-9]+$/, 'Required field') 
        .max(11, 'Meter number cannot exceed 11 digits')
        .min(10, 'Meter number cannot be less than 10 digits'),

        phoneNumber: z
      .string()
      .regex(/^[0-9]+$/, 'Required field')
      .max(15, 'Phone number cannot exceed 15 digits')
      .min(10, 'Phone number cannot be less than 10 digits'),

    })


    export const numberSchema = z.object({
      phoneNumber: z
      .string()
      .regex(/^[0-9]+$/, 'Required field')
      .max(15, 'Phone number cannot exceed 15 digits')
      .min(10, 'Phone number cannot be less than 10 digits'),

    })

    export const tradeSchema = z.object({
      amount1: z
      .string()
      .min(1, 'Required field')
      .regex(/^[0-9]+(\.[0-9]{1,2})?$/, 'Invalid amount')
      .refine(val => parseFloat(val) >= 1, { message: 'Amount must be at least 1' }),
      amount2: z
      .string()
      .min(1, 'Required field')
      .regex(/^[0-9]+(\.[0-9]{1,6})?$/, 'Invalid amount')
      .refine(val => parseFloat(val) >= 0.000001, { message: 'Aamount must be at least 0.000001' }),
    });

    export const buyInput = z.object({
      walletAddress: z.string().nonempty("Wallet Address is required"),
      network: z.string().nonempty("Network is required"),
      phoneNumber: z.string().nonempty("Phone Number is required"),
      paymentMethod: z.string().nonempty("Payment Method is required"),
    });

    export type buyInputValues = z.infer<typeof buyInput>;

    
    export const sellInput = z.object({
      bankName: z.enum(["UBA", "GTB", "First Bank", "Kuda MFB"], {
        errorMap: () => ({ message: "Please select a Bank" }),
      }),
      accountNumber: z
      .string()
      .regex(/^[0-9]+$/, 'Required field')
      .min(10, 'Phone number cannot be less than 10 digits'),
      acountName: z
      .string()
      .regex(/^[0-9]+$/, 'Required field')
      .min(1, 'Required field'),
      phoneNumber: z
        .string()
        .regex(/^[0-9]+$/, 'Required field')
        .max(15, 'Phone number cannot exceed 15 digits')
        .min(10, 'Phone number cannot be less than 10 digits'),

    });


