import React from "react";
import EnrollerDashboardLayout from "../layout";
import { FormHeading } from "@/views/layout";
import EnrollerProfileForm from "./form";

export default function EnrollerProfileView() {
  return (
    <EnrollerDashboardLayout>
      <FormHeading
        headerText="My Profile"
        subHeading="Your Profile as an Enrollee, Update your Profile details, Update your account and Password"
      />
      <EnrollerProfileForm />
    </EnrollerDashboardLayout>
  );
}
