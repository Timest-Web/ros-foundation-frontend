"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import UploadCard from "@/components/cards/profile_upload";
import { Button } from "@/components/button";

const schema = z.object({
  file: z
    .any()
    .refine(
      (file) => file instanceof FileList && file.length > 0,
      "Please upload a document"
    ),
});

type FormData = z.infer<typeof schema>;

export default function BusinessProposalForm() {
  const {
    handleSubmit,
    control,
    formState: {},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      file: null,
    },
  });

  const onSubmit = (data: FormData) => {
    const uploadedFile = data.file[0];
    console.log("Uploaded file:", uploadedFile);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        control={control}
        name="file"
        render={({ }) => (
          <UploadCard
            headingText="Proposal Document"
            subHeading=""
            footerText={true}
            acceptedFileTypes={[
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              "image/png",
              "image/jpg",
              "image/jpeg",
            ]}
            isImage={false}
          />
        )}
      />
      <div className="flex justify-end mt-16">
        <Button type="submit" className="py-2 w-[9rem]">
          Save & Continue
        </Button>
      </div>
    </form>
  );
}
