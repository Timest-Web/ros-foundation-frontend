import { FormHeading } from "@/views/layout";
import React from "react";
import ProfileCard from "@/views/beneficiary/children_account/profile_card";
import AccountManagerDashboardLayout from "@/views/account_manager/layout";
import AccountManagerSecondStepForm from "./form";

export default function AccountManagerSecondStepView() {
  return (
    <AccountManagerDashboardLayout>
      <FormHeading
        headerText="Second step,"
        subHeading="Create Kids Account for Beneficiary, "
        spanText="Maximum of 2 kids"
      />
      <div className="my-4">
        <ProfileCard href="/" />
      </div>
      <AccountManagerSecondStepForm />
    </AccountManagerDashboardLayout>
  );
}
