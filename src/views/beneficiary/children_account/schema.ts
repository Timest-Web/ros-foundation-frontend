import * as z from "zod";

export const loanProfileSchema = z.object({
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
  dob: z.any().refine((val) => !!val, "Date of Birth is required"),
  age: z.string().optional(),
  stateOfOrigin: z.string().min(1, "State of Origin is required"),
  nationality: z.string().min(1, "Nationality is required"),
  address: z.string().min(1, "Address is required"),
  occupation: z.string().min(1, "Occupation is required"),
  loanAmount: z.string().min(1, "Loan Amount is required"),
  profileImage: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Image is required" }),
  documentType: z.string().min(1, "Document type is required"),
  document: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Supporting document is required",
  }),
});
