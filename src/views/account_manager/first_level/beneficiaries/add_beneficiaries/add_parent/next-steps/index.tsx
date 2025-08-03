import { FormHeading } from "@/views/layout";
import React from "react";
import ProfileCard from "@/views/beneficiary/children_account/profile_card";
import AccountManagerDashboardLayout from "@/views/account_manager/layout";
import AccountManagerAddParentNextStepForm from "./form";

export default function AccountManagerAddParentNextStepView() {
  return (
    <AccountManagerDashboardLayout>
      <FormHeading
        headerText="Next steps"
        subHeading="Upload documents & Create a default login password for user"
        isBackButton={true}
      />
      <ProfileCard href="/account-manager/first-level/beneficiaries" />
      <AccountManagerAddParentNextStepForm/>
    </AccountManagerDashboardLayout>
  );
}
