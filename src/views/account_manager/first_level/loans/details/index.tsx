import { CustomTabs } from "@/components/tabs";
import AccountManagerDashboardLayout from "@/views/account_manager/layout";
import { FormHeading } from "@/views/layout";
import React from "react";
import ParentLoanDetails from "./parent";
import ChildLoanDetails from "./child";

export default function LoanDetails() {
  const tabData = [
    {
      id: "parent_user",
      label: "Urel Dave",
      content: <ParentLoanDetails />,
    },
    {
      id: "child_user",
      label: "Augustine Dave",
      content: <ChildLoanDetails />,
    },
  ];
  return (
    <AccountManagerDashboardLayout>
      <FormHeading
        headerText="Loans"
        subHeading="Approve Loans to Beneficiaries"
        isBackButton={true}
      />
      <CustomTabs ariaLabel="Users tab" tabs={tabData} />
    </AccountManagerDashboardLayout>
  );
}
