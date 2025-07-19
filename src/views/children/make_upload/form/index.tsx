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

const options = [
  { id: "nin", name: "NIN" },
  { id: "passport", name: "International Passport" },
  { id: "driverLicense", name: "Driving License" },
];

const mainApplicantSchema = z.object({
  documentType: z.string().min(1, "Document type is required"),
  document: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Supporting document is required",
  }),
});

type MainApplicantFormData = z.infer<typeof mainApplicantSchema>;

export default function MakeUploadForm() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: {},
  } = useForm<MainApplicantFormData>({
    resolver: zodResolver(mainApplicantSchema),
    defaultValues: {
      documentType: "",
      document: undefined,
    },
  });

  const [documentNames, setDocumentNames] = useState<string[]>([]);

  const onSubmit = (data: MainApplicantFormData) => {
    console.log("Submitted data:", data);

    const formData = new FormData();
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="">
        <DocumentUploadCard
          selectedFileName={documentNames[0] ?? null}
          onFileChange={handleDocumentSelect}
          headingText="Select file type"
          subHeading="Invoice of school fees, Receipt of school fees"
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
          <Button type="submit" className="py-2 mt-6 w-72">
          Upload File
        </Button>
      </div>

      
    </form>
  );
}
