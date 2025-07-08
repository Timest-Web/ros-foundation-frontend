import React from "react";
import DashboardLayout from "../layout";
import { FormHeading } from "../onboarding/what_next";
import ProfileForm from "./form";

export default function ProfileView() {
  return (
    <DashboardLayout>
      <FormHeading
        headerText="My Profile"
        subHeading="Update your Profile details, Update your account a Password"
      />
      <ProfileForm />
    </DashboardLayout>
  );
}
