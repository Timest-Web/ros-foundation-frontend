"use client";

import React from "react";
import BeneficiaryDashboardLayout from "../layout";
import { FormHeading } from "@/views/layout";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ControlledInput } from "@/components/form/input/controlled";
import {
  ControlledSelect,
  SelectItem,
} from "@/components/form/select/controlled";
import { banks } from "@/utils/data";
import { Button } from "@/components/button";

const schema = z.object({
  bank: z.string().min(1, "Bank is required"),
  accountNumber: z.string().min(1, "Account Number is required"),
  accountName: z.string().min(1, "Account name is required"),
});

type FormValues = z.infer<typeof schema>;

export default function AccountAndPayoutView() {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      bank: "",
      accountNumber: "",
      accountName: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Submitted data:", data);
  };
  // const tabData = [
  //   {
  //     id: "my_account",
  //     label: "My Account",
  //     content: <MyAccountView />,
  //   },
  //   {
  //     id: "track_payout",
  //     label: "Track Payout",
  //     content: <TrackPayoutView />,
  //   },
  // ];

  return (
    <BeneficiaryDashboardLayout>
      <div>
        <FormHeading
          isBackButton
          headerText="Account for Payout"
          subHeading="Setup Loan Payout Account"
        />
        {/* <CustomTabs ariaLabel="Users tab" tabs={tabData} /> */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="border border-neutral-300 p-4 rounded-md">
              <h3 className="font-righteous text-text-dark mb-6">
                Add bank account
              </h3>
              <div className="grid grid-cols-3 gap-3">
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
                  placeholder="11 digit account number"
                />
                <ControlledInput
                  name="accountName"
                  control={control}
                  label="Account name"
                  type="text"
                />
              </div>
            </div>
           <div className="flex items-end justify-end mt-6"><Button type="submit" className="w-72">Apply for Loan</Button></div> 
          </form>
        </div>
      </div>
    </BeneficiaryDashboardLayout>
  );
}
