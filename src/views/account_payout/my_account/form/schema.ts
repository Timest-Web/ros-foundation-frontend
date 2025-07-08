import * as z from "zod";

export const myAccountSchema = z.object({
  bank: z.string().min(1, "Bank is required"),
  accountNumber: z
    .string()
    .min(1, "Account number is required")
    .regex(/^\d{10}$/, "Invalid phone number"),
  accountName: z.string().min(1, "Account name is required"),
});


