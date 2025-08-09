"use client";

import React from "react";
import { CustomTabs } from "@/components/tabs";
import { FormHeading } from "@/views/layout";
import AccountManagerDashboardLayout from "@/views/account_manager/layout";
import ParentEditForm from "./forms/parent";
import FirstChildEditForm from "./forms/first_child";
import SecondChildEditForm from "./forms/second_child";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { Button } from "@/components/button";

export default function AccountManagerDocumentDetailsView() {
  const tabData = [
    {
      id: "first_user",
      label: "Boma Dave",
      content: <ParentEditForm />,
    },
    {
      id: "second_user",
      label: "Urel Dave",
      content: <FirstChildEditForm />,
    },
    {
      id: "thrid_user",
      label: "Augustine Dave",
      content: <SecondChildEditForm />,
    },
  ];

  return (
    <AccountManagerDashboardLayout>
      <div className="flex justify-between">
        <FormHeading
          headerText="Boma Dave"
          subHeading="Beneficiary Account Details"
          isBackButton={true}
        />
        <div className="flex gap-3 mt-12">
          <Button className="bg-white border flex justify-center gap-2 border-neutral-300 text-primary-100 h-12 w-full">
            <IoMdClose className="mt-[0.15rem]" />
            <p>Decline</p>
          </Button>
          <Button className="h-12 w-full flex justify-center gap-2">
            <IoMdCheckmark className="mt-[0.15rem]" />
            <p>Accept</p>
          </Button>
        </div>
      </div>

      <CustomTabs ariaLabel="Users tab" tabs={tabData} />
    </AccountManagerDashboardLayout>
  );
}
