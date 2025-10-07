"use client";

import React from "react";
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
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

export default function AccountManagerOnePasswordRecoveryForm() {
  const router = useRouter();

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
      alert("Alaba");
    }

    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ControlledInput
        name="email"
        control={control}
        label="Enter your registered Work Email"
        type="email"
      />
      <Button isPending={formState.isSubmitting} type="submit" className="mt-3">
        Send me OTP Recovery code
      </Button>
      <AdditionalFormInfoLink
        className="mt-6"
        text="I already have an Account"
        linkText="Start by Login in here"
        href="/"
      />
    </Form>
  );
}
