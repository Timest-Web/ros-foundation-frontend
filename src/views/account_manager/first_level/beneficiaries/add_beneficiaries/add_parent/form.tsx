"use client";

import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ControlledInput } from "@/components/form/input/controlled";
import { Button } from "@/components/button";
import { Form } from "react-aria-components";
import { ControlledDateField } from "@/components/form/dateinput";
import UploadCard from "@/components/cards/profile_upload";
import { useRouter } from "next/navigation";
import FormLayout from "@/views/form_layout";

const schema = z.object({
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
});

type FormValues = z.infer<typeof schema>;

export default function AddParentForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      file: null,
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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Submitted data:", data);
  };
  const router = useRouter();
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <Controller
        control={control}
        name="file"
        render={({}) => (
          <UploadCard
            headingText="Add a Profile picture"
            subHeading="Add a Profile picture if you wish, else not so important"
            acceptedFileTypes={["image/png", "image/jpg", "image/jpeg"]}
            isImage={true}
          />
        )}
      />
      <FormLayout
        heading="Account Bio data"
        subHeading="User profile information such as name, age, state of origin and more"
      >
        <div className="grid grid-cols-2 gap-2 w-[40rem]">
          <ControlledInput
            name="phoneNumber"
            control={control}
            label="Update Phone number *"
            type="text"
          />
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
            type="text"
          />
          <ControlledInput
            name="stateOfOrigin"
            control={control}
            label="State of Origin *"
            type="text"
          />
          <ControlledInput
            name="nationality"
            control={control}
            label="Nationality *"
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
          <div></div>
          <Button
            onPress={() =>
              router.push(
                "/account-manager/first-level/beneficiaries/add-beneficiaries/add-parent/next-step"
              )
            }
            className="py-3 mt-2"
            type="submit"
          >
            Continue
          </Button>
        </div>
      </FormLayout>
    </Form>
  );
}
