"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ControlledInput } from "@/components/form/input/controlled";
import { Button } from "@/components/button";
import { Form } from "react-aria-components";

const schema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function UpdatePasswordForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ControlledInput
        name="newPassword"
        control={control}
        label="New Password *"
        type={showPassword ? "text" : "password"}
        isRequired
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
        name="confirmPassword"
        control={control}
        label="Re-type password *"
        type={showPassword ? "text" : "password"}
        isRequired
         rightSlot={
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-sm text-primary font-medium cursor-pointer"
          >
            {showConfirmPassword ? "Hide Password" : "Show Passowrd"}
          </span>
        }
      />
      <Button type="submit">Update & Save</Button>
    </Form>
  );
}
