import React from "react";
import BeneficiaryDashboardLayout from "../../layout";
import SecondStepForm from "./form";
import { FormHeading } from "@/views/layout";


export default function SecondStepView() {
  return (
    <BeneficiaryDashboardLayout>
      <FormHeading
        headerText="Second step"
        subHeading="Create your Kids Account,"
        spanText="Maximum of 2"
        isBackButton={true}
      />
      <SecondStepForm />
    </BeneficiaryDashboardLayout>
  );
}
