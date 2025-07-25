import EnrollerDashboardLayout from "@/views/enroller/layout";
import { FormHeading } from "@/views/layout";
import React from "react";
import NextStepForm from "./form";
import ProfileCard from "@/views/beneficiary/children_account/profile_card";

export default function NextStepView() {
  return (
    <EnrollerDashboardLayout>
      <FormHeading
        headerText="Next steps"
        subHeading="Upload documents & Create a default login password for user"
        isBackButton={true}
      />
      <ProfileCard href="/"/>
      <NextStepForm/>
    </EnrollerDashboardLayout>
  );
}
