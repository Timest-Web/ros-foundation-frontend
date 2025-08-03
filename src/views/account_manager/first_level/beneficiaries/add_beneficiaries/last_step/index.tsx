import React from "react";
import { FormHeading } from "@/views/layout";
import AccountManagerDashboardLayout from "@/views/account_manager/layout";
import AccountManagerBusinessProposalForm from "./form";

export default function AccountManagerLastStepView() {
  return (
    <AccountManagerDashboardLayout>
      <FormHeading
        isBackButton={true}
        headerText="Lastly,"
        subHeading="But not required, Add a business Proposal for Beneficiary if any"
      />
      <AccountManagerBusinessProposalForm />
    </AccountManagerDashboardLayout>
  );
}
