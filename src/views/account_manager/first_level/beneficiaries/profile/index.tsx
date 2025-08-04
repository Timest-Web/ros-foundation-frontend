"use client";

import React, { useState } from "react";
import { CustomTabs } from "@/components/tabs";
import { FormHeading } from "@/views/layout";
import AccountManagerDashboardLayout from "@/views/account_manager/layout";
import { Button } from "@/components/button";
import ParentEditForm from "./forms/parent";
import FirstChildEditForm from "./forms/first_child";
import SecondChildEditForm from "./forms/second_child";
import EditIcon from "@/components/icons/EditIcon";

export default function AccountManagerBeneficiaryDetailView() {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const tabData = [
    {
      id: "first_user",
      label: "Boma Dave",
      content: <ParentEditForm isEditing={isEditing} />,
    },
    {
      id: "second_user",
      label: "Urel Dave",
      content: <FirstChildEditForm isEditing={isEditing} />,
    },
    {
      id: "thrid_user",
      label: "Augustine Dave",
      content: <SecondChildEditForm isEditing={isEditing} />,
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
        <Button onPress={toggleEdit} className="w-44 h-12 mt-12">
          {isEditing ? (
            "Update & Save"
          ) : (
            <div className="flex gap-3">
              <EditIcon className="text-white" />
              <p>Edit User Details</p>
            </div>
          )}
        </Button>
      </div>

      <CustomTabs ariaLabel="Users tab" tabs={tabData} />
    </AccountManagerDashboardLayout>
  );
}
