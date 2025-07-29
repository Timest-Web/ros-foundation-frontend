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
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

export default function AccountManagerOneSignInForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, reset, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    const res = await signIn("children-credentials", {
      redirect: false,
      email,
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
        name="email"
        control={control}
        label="Enter your  Work Email"
        type="email"
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
      {errorMessage && <FormError errorMessage={errorMessage} />}
      <AdditionalFormInfoLink
        text="Lost your password?"
        linkText="Let’s recover it "
        href=""
        className="justify-end"
      />
      <Button isPending={formState.isSubmitting} type="submit" className="mt-2">
        Login to your account
      </Button>
    </Form>
  );
}
