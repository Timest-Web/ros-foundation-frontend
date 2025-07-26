"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ControlledInput } from "@/components/form/input/controlled";
import { Button } from "@/components/button";
import { Form } from "react-aria-components";
import { ControlledDateField } from "@/components/form/dateinput";
import {
  ControlledSelect,
  SelectItem,
} from "@/components/form/select/controlled";
import FormLayout from "@/views/form_layout";

// Sample options for education level
const options = [
  { key: "primary", name: "Primary" },
  { key: "secondary", name: "Secondary" },
  { key: "tertiary", name: "Tertiary" },
  { key: "none", name: "None" },
];

const schema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  dob: z.any().refine((val) => !!val, "Date of Birth is required"),
  age: z.string().optional(),
  stateOfOrigin: z.string().min(1, "State of Origin is required"),
  nationality: z.string().min(1, "Nationality is required"),
  address: z.string().min(1, "Address is required"),
  education: z.string().min(1, "Education level is required"),
  schoolName: z.string().min(1, "School Name is required"),
});

type FormValues = z.infer<typeof schema>;

export default function EnrollerSecondStepForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      firstname: "",
      lastname: "",
      dob: undefined,
      age: "",
      stateOfOrigin: "",
      nationality: "",
      address: "",
      education: "",
      schoolName: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormLayout
        heading="First Child Bio data"
        subHeading="Child Bio data information such as name, age, state of origin and more"
      >
        <div className="grid grid-cols-4 gap-2">
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
          <ControlledSelect
            name="education"
            control={control}
            label="Education Level *"
            items={options}
            rules={{ required: "Education level is required" }}
            placeholder="Select Level "
          >
            {(item) => <SelectItem id={item.key}>{item.name}</SelectItem>}
          </ControlledSelect>
          <div className="col-span-4">
            <ControlledInput
              name="schoolName"
              control={control}
              label="School Name *"
              type="text"
            />
          </div>
        </div>
      </FormLayout>
      <FormLayout
        heading="Second Child Bio data"
        subHeading="Child Bio data information such as name, age, state of origin and more"
      >
        <div
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-4 gap-2"
        >
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
          <ControlledSelect
            name="education"
            control={control}
            label="Education Level *"
            items={options}
            rules={{ required: "Education level is required" }}
            placeholder="Select Level "
          >
            {(item) => <SelectItem id={item.key}>{item.name}</SelectItem>}
          </ControlledSelect>
          <div className="col-span-4">
            <ControlledInput
              name="schoolName"
              control={control}
              label="School Name *"
              type="text"
            />
          </div>
        </div>
      </FormLayout>
      <div className="flex justify-end">
        <Button className="py-3 mt-2 w-[10rem]" type="submit">
          Save and Continue
        </Button>
      </div>
    </Form>
  );
}
