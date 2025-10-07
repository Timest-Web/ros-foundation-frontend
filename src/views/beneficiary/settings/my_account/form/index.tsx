"use client";

import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { myAccountSchema } from "./schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { ControlledInput } from "@/components/form/input/controlled";
import {
  ControlledSelect,
  SelectItem,
} from "@/components/form/select/controlled";
import { Button } from "@/components/button";
import { Form } from "react-aria-components";
import { banks } from "@/utils/data";

type FormValues = z.infer<typeof myAccountSchema>;

export default function MyAccountForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(myAccountSchema),
    mode: "onSubmit",
    defaultValues: {
      bank: "",
      accountName: "",
      accountNumber: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <div className=" w-1/3">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="border border-neutral-300 p-4 flex flex-col gap-2 rounded-md">
          <ControlledSelect
            name="bank"
            control={control}
            label="Bank"
            items={banks}
            placeholder="Select Bank"
          >
            {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
          </ControlledSelect>

          <ControlledInput
            name="accountNumber"
            control={control}
            label="Enter account number"
            type="text"
          />

          <ControlledInput
            name="accountName"
            control={control}
            label="Account name"
            type="text"
          />
          <p className="font-plus_jakarta_sans text-text-dark text-xs">
            Account name would be generated automatically from account number
            provided
          </p>
        </div>
        <div>
          <Button type="submit" className="py-2">
            Add Bank Account
          </Button>
        </div>
      </Form>
      <p className="font-plus_jakarta_sans text-xs text-text-dark mt-4 font-semibold">
        Hint: Multiple accounts could be added
      </p>
    </div>
  );
}
