"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ControlledInput } from "@/components/form/input/controlled";
import { Button } from "@/components/button";
import { Form } from "react-aria-components";

const schema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10,14}$/, "Invalid phone number"),
});

type FormValues = z.infer<typeof schema>;

export default function PasswordRecoveryForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      phoneNumber: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ControlledInput
        name="phoneNumber"
        control={control}
        label="Or enter your Phone number here to get started"
        type="text"
      />
      <Button className="mt-8" type="submit">Send me OTP Recovery code</Button>
    </Form>
  );
}
