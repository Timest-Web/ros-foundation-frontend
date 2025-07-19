"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ControlledInput } from "@/components/form/input/controlled";
import { Button } from "@/components/button";
import { Form } from "react-aria-components";
import { EditProfileUpdateSchema } from "./schema";
import FormLayout from "@/views/form_layout";
import { ControlledDateField } from "@/components/form/dateinput";

type FormValues = z.infer<typeof EditProfileUpdateSchema>;

export default function EditProfileForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(EditProfileUpdateSchema),
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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormLayout
        heading="First Child Bio data"
        subHeading="Child Bio data information such as name, age, state of origin and more"
      >
        <div className="grid grid-cols-2 gap-2">
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
