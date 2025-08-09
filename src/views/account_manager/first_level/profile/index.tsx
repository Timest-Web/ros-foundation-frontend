import React from "react";
import { FormHeading } from "@/views/layout";
import AccountManagerDashboardLayout from "@/views/account_manager/layout";
import AccountManagerProfileForm from "./form";

export default function AccountManagerProfileView() {
  return (
    <AccountManagerDashboardLayout>
      <FormHeading
        headerText="My Profile"
        subHeading="Your Profile as a Manager Tier 1, Update your Profile details, Update your account and Password"
      />
      <AccountManagerProfileForm />
    </AccountManagerDashboardLayout>
  );
}
