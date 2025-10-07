import React from "react";
import { FormHeading } from "@/views/layout";
import AccountManagerProfileForm from "./form";
import AuditorDashboardLayout from "../layout";

export default function AccountManagerProfileView() {
  return (
    <AuditorDashboardLayout>
      <FormHeading
        headerText="My Profile"
        subHeading="Your Profile as a Manager Tier 1, Update your Profile details, Update your account and Password"
      />
      <AccountManagerProfileForm />
    </AuditorDashboardLayout>
  );
}
