import { FormHeading } from "@/views/layout";
import React from "react";
import AddParentForm from "./form";
import AccountManagerDashboardLayout from "@/views/account_manager/layout";

export default function AccountManagerAddParentView() {
  return (
    <AccountManagerDashboardLayout>
      <FormHeading
        headerText="Add a Parent Beneficiary"
        subHeading="Create Parent Account"
        isBackButton={true}
      />
      <AddParentForm />
    </AccountManagerDashboardLayout>
  );
}
