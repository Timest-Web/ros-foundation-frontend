"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ControlledInput } from "@/components/form/input/controlled";
import { Button } from "@/components/button";
import { Form } from "react-aria-components";
import { ControlledDateField } from "@/components/form/dateinput";
import { profileUpdateSchema } from "./schema";
import { DashboardCard } from "@/components/cards/dashboard_card";
import FormLayout from "../../../form_layout";
import UploadCard from "@/components/cards/profile_upload";

type FormValues = z.infer<typeof profileUpdateSchema>;

export default function ProfileForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(profileUpdateSchema),
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
      oldPassword: "",
      newPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <div className="flex flex-col gap-4">
        <UploadCard
          apiEndpoint=""
          headingText="Add a Profile picture"
          subHeading="Add a Profile picture if you wish, else not so important"
          acceptedFileTypes={["image/png", "image/jpg", "image/jpeg"]}
          isImage={true}
        />
        <DashboardCard
          headingText="Update your password"
          pageLink=""
          content={
            <div className="flex flex-col gap-3">
              <ControlledInput
                name="oldPassword"
                control={control}
                label="Old Password *"
                type={showPassword ? "text" : "password"}
                placeholder="enter old password"
                rightSlot={
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-sm text-primary font-medium cursor-pointer"
                  >
                    {showPassword ? "Hide Password" : "Show Password"}
                  </span>
                }
              />
              <ControlledInput
                name="newPassword"
                control={control}
                label="New Password *"
                type={showPassword ? "text" : "password"}
                placeholder="enter new password"
              />
            </div>
          }
        />
      </div>
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
          <Button className="py-3 mt-2" type="submit">
            Update & Save
          </Button>
        </div>
      </FormLayout>
    </Form>
  );
}
