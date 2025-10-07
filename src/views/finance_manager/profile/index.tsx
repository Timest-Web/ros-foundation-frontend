import React from "react";
import { FormHeading } from "@/views/layout";
import FounderProfileForm from "./form";
import FounderDashboardLayout from "../layout";

export default function FounderProfileView() {
  return (
    <FounderDashboardLayout>
      <FormHeading
        headerText="My Profile"
        subHeading="Your Profile as a Manager Tier 4, Update your Profile details, Update your account and Password"
      />
      <FounderProfileForm />
    </FounderDashboardLayout>
  );
}
