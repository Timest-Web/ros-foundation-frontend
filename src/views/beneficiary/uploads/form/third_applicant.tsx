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
import UploadCard from "@/components/cards/profile_upload";

const options = [
  { id: "nin", name: "NIN" },
  { id: "passport", name: "International Passport" },
  { id: "driverLicense", name: "Driving License" },
];

const mainApplicantSchema = z.object({
  profileImage: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Image is required" }),
  documentType: z.string().min(1, "Document type is required"),
  document: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Supporting document is required",
  }),
});

type MainApplicantFormData = z.infer<typeof mainApplicantSchema>;

export default function ThirdApplicantForm() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: {},
  } = useForm<MainApplicantFormData>({
    resolver: zodResolver(mainApplicantSchema),
    defaultValues: {
      profileImage: undefined,
      documentType: "",
      document: undefined,
    },
  });

  const [documentNames, setDocumentNames] = useState<string[]>([]);

  const onSubmit = (data: MainApplicantFormData) => {
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

  return (
    <div>
      <p className="text-text-dark text-xs font-plus_jakarta_sans">
        All Uploads for Boma Dave
      </p>
      <div className="flex gap-4 mt-4">
        <UploadCard
          headingText="Upload Passport photograph"
          subHeading="Clear and Precise in white or red background"
          acceptedFileTypes={["image/png", "image/jpeg", "image/jpg"]}
          isImage={true}
          footerText={true}
        />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <div className="flex justify-end mt-20">
            <Button type="submit" className="py-2 w-[8.6rem] ">
              Save for User
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
