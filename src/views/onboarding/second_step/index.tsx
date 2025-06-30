import React from "react";
import OnboardingLayout from "../layout";
import SecondStepForm from "./form";
import { FormHeading } from "../what_next";

export default function SecondStepView() {
  return (
    <OnboardingLayout>
      <FormHeading
        headerText="Second step"
        subHeading="Create your Kids Account,"
        spanText="Maximum of 2"
      />
      <SecondStepForm />
    </OnboardingLayout>
  );
}
