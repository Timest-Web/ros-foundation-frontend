import React from "react";
import DashboardLayout from "../../layout";
import SecondStepForm from "./form";
import { FormHeading } from "../what_next";

export default function SecondStepView() {
  return (
    <DashboardLayout>
      <FormHeading
        headerText="Second step"
        subHeading="Create your Kids Account,"
        spanText="Maximum of 2"
      />
      <SecondStepForm />
    </DashboardLayout>
  );
}
