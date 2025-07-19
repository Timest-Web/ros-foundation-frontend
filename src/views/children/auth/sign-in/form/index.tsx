"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ControlledInput } from "@/components/form/input/controlled";
import { Button } from "@/components/button";
import { Form } from "react-aria-components";

const schema = z.object({
  parentPhone: z.string().min(1, "Parent phone number is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Second name is required"),
});

type FormValues = z.infer<typeof schema>;

export default function ChildrenSignInForm() {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      parentPhone: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Submitted data:", data);
    reset()
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ControlledInput
        name="parentPhone"
        control={control}
        label="Enter Parent Phone number *"
        type="text"
      />
      <ControlledInput
        name="firstName"
        control={control}
        label="Enter Child's First Name *"
        type="text"
      />
      <ControlledInput
        name="lastName"
        control={control}
        label="Enter Child's Second Name *"
        type="text"
      />

      <Button type="submit" className="mt-4">
        Login to Portal
      </Button>
    </Form>
  );
}
