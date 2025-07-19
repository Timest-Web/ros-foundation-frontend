"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ControlledInput } from "@/components/form/input/controlled";
import { Button } from "@/components/button";
import { Form } from "react-aria-components";
import Link from "next/link";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

export default function BeneficiarySignInForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ControlledInput
        name="email"
        control={control}
        label="Enter Phone number *"
        type="text"
      />

      <ControlledInput
        name="password"
        control={control}
        label="Password *"
        type={showPassword ? "text" : "password"}
        rightSlot={
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm text-primary font-medium cursor-pointer"
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </span>
        }
      />
      <div className="font-plus_jakarta_sans text-sm flex space-x-2 justify-end mb-6">
        <p className="text-text-dark">Lost your password?</p>
        <Link href={"/"} className="text-primary-100">
          Let’s recover it
        </Link>
      </div>
      <Button type="submit">Login to your account</Button>
    </Form>
  );
}
