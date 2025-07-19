"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ControlledInput } from "@/components/form/input/controlled";
import { Button } from "@/components/button";
import { Form } from "react-aria-components";

const schema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10,14}$/, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function BeneficiarySignUpForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      firstname: "",
      lastname: "",
      phoneNumber: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Submitted data:", data);

  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex space-x-2">
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
      </div>
      <ControlledInput
        name="phoneNumber"
        control={control}
        label="Phone number *"
        type="text"
      />
      <ControlledInput
        name="password"
        control={control}
        label="Password *"
        type={showPassword ? "text" : "password"}
        placeholder="Hint: Try to use words or characters you can remember always"
        rightSlot={
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm text-primary font-medium cursor-pointer"
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </span>
        }
      />
      
      <Button type="submit">Create a Beneficiary Account</Button>
    </Form>
  );
}
