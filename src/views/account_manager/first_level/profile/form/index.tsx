"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ControlledInput } from "@/components/form/input/controlled";
import { Button } from "@/components/button";
import { Form } from "react-aria-components";
import { DashboardCard } from "@/components/cards/dashboard_card";
import UploadCard from "@/components/cards/profile_upload";
import { AccountManagerProfileUpdateSchema } from "./schema";
import FormLayout from "@/views/form_layout";


type FormValues = z.infer<typeof AccountManagerProfileUpdateSchema>;

export default function AccountManagerProfileForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(AccountManagerProfileUpdateSchema),
    mode: "onSubmit",
    defaultValues: {
      file: null,
      firstname: "",
      lastname: "",
      phoneNumber: "",
      email: "",
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
          acceptedFileTypes={['image/png', 'mage/jpg', 'image/jpeg']}
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
        className="h-92"
        heading="Account Bio data"
        subHeading="User profile information such as name, age, state of origin and more"
      >
        <div className="grid grid-cols-2 gap-2 w-[40rem]">
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
            label="Update Phone number *"
            type="text"
          />
          <ControlledInput
            name="email"
            control={control}
            label="Work email Address"
            type="email"
          />
          <div className="flex gap-4 font-plus_jakarta_sans text-text-dark pt-2">
            <section className="flex flex-col gap-2">
              <h3 className="font-bold text-sm">Account Type</h3>
              <p className="text-xs">Manager Tier 1</p>
            </section>
            <section className="flex flex-col gap-2">
              <h3 className="font-bold text-sm">Status</h3>
              <p className="text-xs">Active</p>
            </section>
          </div>
          <Button className="py-3 mt-2" type="submit">
            Update & Save
          </Button>
        </div>
      </FormLayout>
    </Form>
  );
}
