"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ControlledSelect,
  SelectItem,
} from "@/components/form/select/controlled";
import DocumentUploadCard from "@/components/cards/upload_card";
import { Button } from "@/components/button";
import { ControlledInput } from "@/components/form/input/controlled";
import { generatePassword } from "@/utils/functions";

const options = [
  { id: "nin", name: "NIN" },
  { id: "passport", name: "International Passport" },
  { id: "driverLicense", name: "Driving License" },
];

const NextStepSchema = z.object({
  profileImage: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Image is required" }),
  documentType: z.string().min(1, "Document type is required"),
  document: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Supporting document is required",
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type NextStepFormData = z.infer<typeof NextStepSchema>;

export default function NextStepForm() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: {},
  } = useForm<NextStepFormData>({
    resolver: zodResolver(NextStepSchema),
    defaultValues: {
      profileImage: undefined,
      documentType: "",
      document: undefined,
    },
  });

  const [documentNames, setDocumentNames] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: NextStepFormData) => {
    console.log("Submitted data:", data);

    const formData = new FormData();
    formData.append("profileImage", data.profileImage);
    formData.append("documentType", data.documentType);
    formData.append("document", data.document);
  };

  const handleDocumentSelect = (fileList: FileList | null) => {
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setValue("document", file, { shouldValidate: true });
      setDocumentNames([file.name]);
    }
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setValue("password", newPassword, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="flex gap-4 mt-4">
        <DocumentUploadCard
          selectedFileName={documentNames[0] ?? null}
          onFileChange={handleDocumentSelect}
          headingText="Document of Identification"
          subHeading="NIN, Int. Passport, Driver License or Voters card is accepted"
          hintText="Selected type must match attached file"
          footerText={true}
          selectField={
            <ControlledSelect
              name="documentType"
              control={control}
              label=""
              items={options}
              placeholder="Select Identification type"
            >
              {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
            </ControlledSelect>
          }
        />
        <div>
          <section className="border border-neutral-300 p-4 lg:w-72 h-[14rem] rounded-md flex flex-col gap-3 text-text-dark">
            <h3 className="font-righteous text-text-dark">
              Generate password for user
            </h3>
            <ControlledInput
              name="password"
              control={control}
              label="Generated Password"
              type={showPassword ? "text" : "password"}
              rightSlot={
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-primary font-medium cursor-pointer"
                >
                  {showPassword ? "Hide Password" : "Show Password"}
                </span>
              }
            />

            <Button type="button" onClick={handleGeneratePassword}>
              Generate Password
            </Button>
          </section>
          <p className="font-plus_jakarta_sans text-xs text-text-dark mt-2">
            <span className="font-semibold text-primary-100">Hint:</span>on
            creating user account we would notify them <br></br> about their login details
          </p>
        </div>
      </div>

      <div className="flex justify-end mt-20 w-[53%]">
        <Button type="submit" className="py-2 w-[8.6rem] ">
          Save for User
        </Button>
      </div>
    </form>
  );
}
