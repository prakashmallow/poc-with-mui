import { z } from "zod";

// UK Bank Account Schema
export const ukBankAccountSchema = z.object({
  nameOnAccount: z
    .string()
    .min(1, "Please enter name on account, you cannot skip this field")
    .refine((val) => !/\d/.test(val), {
      message: "Numbers not allowed",
    })
    .refine((val) => /[a-zA-Z]/.test(val), {
      message: "Name should include at least one alphabetical character",
    }),
  accountNumber: z
    .string()
    .min(1, "Please enter account number, you cannot skip this field")
    .length(8, "Account number should be 8 characters"),
  sortCode: z
    .string()
    .min(1, "Please enter sort code, you cannot skip this field")
    .length(6, "Sort code should be 6 characters"),
  bankAddressCity: z.string().optional(),
  currency: z.string().optional(),
});

export type UKBankFormData = z.infer<typeof ukBankAccountSchema>;

// International Bank Account Schema
export const internationalBankAccountSchema = z.object({
  internationalAccountNumber: z.string().min(1, "Please enter international account number, you cannot skip this field"),
  nameOnAccount: z.string().min(1, "Please enter name on account, you cannot skip this field"),
  swiftBic: z.string().min(1, "Please enter SWIFT/BIC, you cannot skip this field"),
  iban: z.string().min(1, "Please enter IBAN, you cannot skip this field"),
  bankAddressCountry: z.string().min(1, "Please enter bank address country, you cannot skip this field"),
  currency: z.string().min(1, "Please enter currency, you cannot skip this field"),
  bankAddressLine1: z.string().optional(),
  bankAddressLine2: z.string().optional(),
  bankAddressCity: z.string().optional(),
  bankAddressPostcode: z.string().optional(),
});

export type InternationalBankFormData = z.infer<typeof internationalBankAccountSchema>;

// PayPal Schema
export const paypalSchema = z.object({
  paypalEmail: z
    .string()
    .min(1, "Please enter Paypal email address, you cannot skip this field")
    .email("Please enter a valid email address"),
  currency: z.string().min(1, "Please enter currency, you cannot skip this field"),
});

export type PaypalFormData = z.infer<typeof paypalSchema>;

// Payment Type Schema
export const paymentTypeSchema = z.enum(["bankAccount", "paypal"], {
  message: "Please select payment type, you cannot skip this field",
});

export type PaymentType = z.infer<typeof paymentTypeSchema>;

