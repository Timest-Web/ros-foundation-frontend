import * as z from "zod";

export const EnrollerProfileUpdateSchema = z.object({
  file: z
    .any()
    .refine(
      (file) => file instanceof FileList && file.length > 0,
      "Please upload a document"
    ),
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10,14}$/, "Invalid phone number"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  oldPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});