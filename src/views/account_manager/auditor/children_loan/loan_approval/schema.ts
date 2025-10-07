import * as z from "zod";

export const childSchema = z
  .object({
    file: z
      .any()
      .refine(
        (file) => file instanceof FileList && file.length > 0,
        "Please upload a document"
      ),
    education: z.string().min(1, "Education"),
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\d{10,14}$/, "Invalid phone number"),
    email: z
      .string()
      .email("Invalid email address")
      .optional()
      .or(z.literal("")),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
