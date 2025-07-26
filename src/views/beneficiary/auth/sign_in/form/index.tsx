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
import AdditionalFormInfoLink from "@/components/extras/additional_form_info";


const schema = z.object({
  phone: z.string().min(1, "Phone Number is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

export default function BeneficiarySignInForm() {
  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<FormValues> = async ({ phone, password }) => {
    // console.log("Submitted data:", data);

    const res = await signIn("beneficiary-credentials", {
      redirect: false,
      phone,
      password,
    });

    if (res?.ok) {
      router.push("/beneficiary");
    } else {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ControlledInput
        name="phone"
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
     <AdditionalFormInfoLink text="Lost your password?" href="/beneficiary/password-recovery" linkText="Let’s recover it "/>
      {errorMessage && (
        <p className="text-red-500 font-plus_jakarta_sans text-sm font-semibold">
          {errorMessage}
        </p>
      )}
      <Button isPending={formState.isSubmitting} type="submit">Login to your account</Button>
    </Form>
  );
}
