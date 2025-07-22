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

const schema = z.object({
  parentPhone: z.string().min(1, "Parent phone number is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Second name is required"),
});

type FormValues = z.infer<typeof schema>;

export default function ChildrenSignInForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const { control, handleSubmit, reset, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      parentPhone: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async ({
    parentPhone,
    firstName,
    lastName,
  }) => {
    const res = await signIn("children-credentials", {
      redirect: false,
      parentPhone,
      firstName,
      lastName,
    });

    if (res?.ok) {
      router.push("/children");
    } else {
      setErrorMessage("Invalid credentials. Please try again.");
    }

    reset();
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
       {errorMessage && <p className="text-red-500 font-plus_jakarta_sans text-sm font-semibold">{errorMessage}</p>}
      <Button isPending={formState.isSubmitting} type="submit" className="mt-4">
        Login to Portal
      </Button>
    </Form>
  );
}
