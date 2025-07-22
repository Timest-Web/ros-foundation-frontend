"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ControlledInput } from "@/components/form/input/controlled";
import { Button } from "@/components/button";
import { Form } from "react-aria-components";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormError } from "@/views/auth_layout";
import AdditionalFormInfoLink from "@/components/extras/additional_form_info";

const schema = z.object({
  password: z.string().min(1, "Email is required"),
  confirmpassword: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

export default function EnrollerUpdatePasswordForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, reset, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      password: "",
      confirmpassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async ({ password }) => {
    const res = await signIn("children-credentials", {
      redirect: false,
      password,
    });

    if (res?.ok) {
      router.push("/children");
    } else {
      setErrorMessage("Invalid credentials. Please try again.");
    }

    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-10">
      <ControlledInput
        name="password"
        control={control}
        label="Enter Password *"
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
      <ControlledInput
        name="confirmpassword"
        control={control}
        label="Re-type password *"
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
      {errorMessage && <FormError errorMessage={errorMessage} />}
      <Button
        isPending={formState.isSubmitting}
        type="submit"
        className="mt-2 mb-4"
      >
        Update & Save
      </Button>
      <AdditionalFormInfoLink
        className="mt-6"
        text="Login to your Account"
        linkText="Start by Login in here"
        href="/"
      />
    </Form>
  );
}
