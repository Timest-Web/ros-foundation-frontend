import EnrollerDashboardLayout from "@/views/enroller/layout";
import { FormHeading } from "@/views/layout";
import React from "react";
import AddParentForm from "./form";

export default function AddParentView() {
  return (
    <EnrollerDashboardLayout>
      <FormHeading
        headerText="Add a Parent Beneficiary"
        subHeading="Create Parent Account"
        isBackButton={true}
      />
      <AddParentForm/>
    </EnrollerDashboardLayout>
  );
}
