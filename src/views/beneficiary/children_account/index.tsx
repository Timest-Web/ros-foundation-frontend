/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import BeneficiaryDashboardLayout from "../layout";
import FormLayout from "@/views/form_layout";
import { ControlledInput } from "@/components/form/input/controlled";
import { ControlledDateField } from "@/components/form/dateinput";
import { loanProfileSchema } from "./schema";
import FileUploadPicker from "@/components/cards/profile_upload";
import DocumentUploadCard from "@/components/cards/upload_card";
import {
  ControlledSelect,
  SelectItem,
} from "@/components/form/select/controlled";
import { Button } from "@/components/button";

type FormValues = z.infer<typeof loanProfileSchema>;
const options = [
  { id: "nin", name: "NIN" },
  { id: "passport", name: "International Passport" },
  { id: "driverLicense", name: "Driving License" },
];

export default function ChildrenLoanProfile() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {},
  } = useForm<FormValues>({
    resolver: zodResolver(loanProfileSchema),
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
    },
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [documentNames, setDocumentNames] = useState<string[]>([]);

  const handleDocumentSelect = (fileList: FileList | null) => {
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setValue("document", file, { shouldValidate: true });
      setDocumentNames([file.name]);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Submitted Successfully:", data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <BeneficiaryDashboardLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout
          heading="Children Loan Profile"
          subHeading="It’s quick, upload relevant Document and apply for a loan "
        >
          <div className="grid grid-cols-3 gap-x-4 gap-y-6 ">
            <ControlledInput
              name="firstname"
              control={control}
              label="First Name *"
              type="text"
            />
            <ControlledInput
              name="lastname"
              control={control}
              label="Last Name *"
              type="text"
            />
            <ControlledInput
              name="phoneNumber"
              control={control}
              label="Phone number *"
              type="tel"
            />
            <ControlledInput
              name="email"
              control={control}
              label="Add an email address"
              type="email"
            />
            <ControlledDateField
              control={control}
              name="dob"
              label="Date of Birth *"
            />
            <ControlledInput
              name="age"
              control={control}
              label="Age"
              type="number"
            />
            <ControlledInput
              name="stateOfOrigin"
              control={control}
              label="State of Origin *"
              type="text"
            />
            <ControlledInput
              name="address"
              control={control}
              label="Residential Address *"
              type="text"
            />
            <ControlledInput
              name="occupation"
              control={control}
              label="Occupation *"
              type="text"
            />
            {/* <div className="col-start-2 flex justify-end">
              <Button className="py-3 mt-4 w-full" type="submit">
                Update & Save
              </Button>
            </div> */}
          </div>
        </FormLayout>
        <div className="mt-12">
          <p className="text-text-dark text-xs font-plus_jakarta_sans mb-4">
            Hi Boma, upload all required document to be reviewed for approval of
            loan
          </p>
          <section className="grid grid-cols-3 gap-2">
            <FileUploadPicker
              headingText="Profile Picture"
              subHeading="Upload a picture for your profile."
              acceptedFileTypes={["image/png", "image/jpeg", "image/gif"]}
              formats="PNG, JPG, GIF"
              isImage={true}
              onFileChange={(file) => setProfileImage(file)}
              required={true}
            />
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
            <DocumentUploadCard
              selectedFileName={documentNames[0] ?? null}
              onFileChange={handleDocumentSelect}
              headingText="Other Document "
              subHeading="Invoice of school fees, Receipt of school fees"
              hintText="Selected type must match attached file"
              footerText={true}
              selectField={
                <ControlledSelect
                  name="documentType"
                  control={control}
                  label=""
                  items={options}
                  placeholder="Select document type"
                >
                  {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
                </ControlledSelect>
              }
            />
            <div className="lg:w-72 flex flex-col space-y-2">
              <div className="border p-4 lg:w-72 h-[14rem] rounded-md flex flex-col gap-3 text-text-dark transition-colors border-neutral-300">
                <p className="font-righteous">Enter Loan Amount</p>
                <p className="font-plus_jakarta_sans text-xs">
                  How much do you need?
                </p>
                <ControlledInput
                  name="loanAmount"
                  control={control}
                  label=""
                  type="text"
                  startAdornment="NGN"
                />
                <p className="font-plus_jakarta_sans text-xs">
                  <span className="font-semibold">Note:</span>2.5% upon total
                  loan would be added as interest upon repayment within a 4
                  month period
                </p>
              </div>
              <Button type="submit">Continue</Button>
            </div>
          </section>
        </div>
      </form>
    </BeneficiaryDashboardLayout>
  );
}
