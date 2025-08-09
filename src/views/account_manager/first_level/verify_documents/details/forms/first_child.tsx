"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ControlledInput } from "@/components/form/input/controlled";
import { Button } from "@/components/button";
import { Form } from "react-aria-components";
import { ControlledDateField } from "@/components/form/dateinput";
import UploadCard from "@/components/cards/profile_upload";
import FormLayout from "@/views/form_layout";
import {
  ControlledSelect,
  SelectItem,
} from "@/components/form/select/controlled";
import DocumentUploadCard from "@/components/cards/upload_card";
import AttachIcon from "@/components/icons/AttachIcon";
import sampleNIN from "../../../../../../../public/images/sample_nin.jpg"; // Keep this import
import DocumentVerificationModal from "@/components/modal/document_modal";
import ScannerIcon from "@/components/icons/ScannerIcon";


const schema = z.object({
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
  documentType: z.string().min(1, "Document type is required"),
  document: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Supporting document is required",
  }),
});

const options = [
  { id: "nin", name: "NIN" },
  { id: "passport", name: "International Passport" },
  { id: "driverLicense", name: "Driving License" },
];

type FormValues = z.infer<typeof schema>;

export default function FirstChildEditForm() {

  const { control, handleSubmit, reset, setValue, watch } = useForm<FormValues>(
    {
      resolver: zodResolver(schema),
      mode: "onSubmit",
      defaultValues: {
        firstname: "",
        lastname: "",
        phoneNumber: "",
        email: "",
        dob: undefined,
        age: "",
        stateOfOrigin: "",
        nationality: "",
        address: "",
        occupation: "",
        documentType: "", 
      },
    }
  );

  // Watch the value of documentType to pass it to the modal
  const selectedDocumentType = watch("documentType");

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Submitted data:", data);
    reset();
  };

  const [documentNames, setDocumentNames] = useState<string[]>([]);
  const handleDocumentSelect = (fileList: FileList | null) => {
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setValue("document", file, { shouldValidate: true });
      setDocumentNames([file.name]);
    }
  };

  // Callback for when the verification action is complete
  const handleVerificationComplete = (status: "accepted" | "declined") => {
    alert(`Document verification status: ${status}.`);
    // Here you can add logic to update the UI, refetch data, etc.
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <div className="flex flex-col gap-2">
        <UploadCard
          className="h-[13rem]"
          headingText="Uploaded Passport photograph"
          subHeading="Clear and Precise in white or red background"
          acceptedFileTypes={["image/png", "image/jpg", "image/jpeg"]}
          isImage={true}
          isDisabled={true}
        />
        <DocumentUploadCard
          className="[h-13rem]"
          selectedFileName={documentNames[0] ?? null}
          onFileChange={handleDocumentSelect}
          headingText="Document of Identification"
          subHeading={"Selected Document"}
          hintText="Selected type must match attached file"
          footerText={true}
          isDisabled={true}
          selectField={
            <div>
              <ControlledSelect
                name="documentType"
                control={control}
                label=""
                items={options}
                placeholder="Select Identification type"
              >
                {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
              </ControlledSelect>
              <div className="flex gap-2 mt-4">
                <AttachIcon />
                <p className="font-plus_jakarta_sans font-semibold text-primary-100 text-xs">
                  {documentNames[0] || "No file attached"}
                </p>
              </div>

              <DocumentVerificationModal
                documentId="boma-dave-001"
                documentName={documentNames[0] || "Document"}
                documentType={
                  options.find((opt) => opt.id === selectedDocumentType)
                    ?.name || "N/A"
                }
                imageUrl={sampleNIN}
                onActionComplete={handleVerificationComplete}
              >
                <Button className="bg-white space-y-4 font-bold text-xs text-primary-100 mt-2">
                  <div className="flex justify-center items-center">
                    <ScannerIcon />
                  </div>
                  <p>Open Verification Panel</p>
                </Button>
              </DocumentVerificationModal>
            </div>
          }
        />
      </div>
      <FormLayout
        heading="Account Bio data"
        subHeading="User profile information such as name, age, state of origin and more"
      >
        <div className="grid grid-cols-2 gap-3 w-[40rem]">
          <ControlledInput
            name="phoneNumber"
            control={control}
            label="Update Phone number *"
            type="text"
            isDisabled={true}
          />
          <ControlledInput
            name="firstname"
            control={control}
            label="First Name *"
            type="text"
            isDisabled={true}
          />
          <ControlledInput
            name="lastname"
            control={control}
            label="Last Name *"
            type="text"
            isDisabled={true}
          />
          <ControlledInput
            name="email"
            control={control}
            label="Add an email address"
            type="email"
            isDisabled={true}
          />
          <ControlledDateField
            control={control}
            name="dob"
            label="Date of Birth *"
            isDisabled={true}
          />
          <ControlledInput
            name="age"
            control={control}
            label="Age"
            type="text"
            isDisabled={true}
          />
          <ControlledInput
            name="stateOfOrigin"
            control={control}
            label="State of Origin *"
            type="text"
            isDisabled={true}
          />
          <ControlledInput
            name="nationality"
            control={control}
            label="Nationality *"
            type="text"
            isDisabled={true}
          />
          <ControlledInput
            name="address"
            control={control}
            label="Residential Address *"
            type="text"
            isDisabled={true}
          />
          <ControlledInput
            name="occupation"
            control={control}
            label="Occupation *"
            type="text"
            isDisabled={true}
          />
          <div></div>
          {/* <Button className="py-3 mt-2" type="submit">
            Update & Save
          </Button> */}
        </div>
      </FormLayout>
    </Form>
  );
}
