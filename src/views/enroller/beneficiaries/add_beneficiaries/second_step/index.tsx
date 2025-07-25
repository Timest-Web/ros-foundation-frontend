import EnrollerDashboardLayout from "@/views/enroller/layout";
import { FormHeading } from "@/views/layout";
import React from "react";
import EnrollerSecondStepForm from "./form";
import ProfileCard from "@/views/beneficiary/children_account/profile_card";

export default function EnrollerSecondStepView() {
  return (
    <EnrollerDashboardLayout>
      <FormHeading
        headerText="Second step,"
        subHeading="Create Kids Account for Beneficiary, "
        spanText="Maximum of 2 kids"
      />
      <div className="my-4">
        <ProfileCard href="/" />
      </div>
      <EnrollerSecondStepForm />
    </EnrollerDashboardLayout>
  );
}
