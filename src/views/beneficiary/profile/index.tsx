import React from "react";
import BeneficiaryDashboardLayout from "../layout";
import { FormHeading } from "@/views/layout";
import ProfileForm from "./form";

export default function ProfileView() {
  return (
    <BeneficiaryDashboardLayout>
      <FormHeading
        headerText="My Profile"
        subHeading="Update your Profile details, Update your account a Password"
      />
      <ProfileForm />
    </BeneficiaryDashboardLayout>
  );
}
