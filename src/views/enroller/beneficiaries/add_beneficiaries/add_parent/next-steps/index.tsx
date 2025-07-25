import EnrollerDashboardLayout from "@/views/enroller/layout";
import { FormHeading } from "@/views/layout";
import React from "react";
import ProfileCard from "@/views/beneficiary/children_account/profile_card";
import AddParentNextStepForm from "./form";

export default function AddParentNextStepView() {
  return (
    <EnrollerDashboardLayout>
      <FormHeading
        headerText="Next steps"
        subHeading="Upload documents & Create a default login password for user"
        isBackButton={true}
      />
      <ProfileCard href="/"/>
      <AddParentNextStepForm/>
    </EnrollerDashboardLayout>
  );
}
