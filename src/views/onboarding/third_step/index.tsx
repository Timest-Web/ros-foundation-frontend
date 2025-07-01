import React from "react";
import OnboardingLayout from "../layout";
import MainApplicantForm from "./form/main_applicant";
import { CustomTabs } from "@/components/tabs";
import SecondApplicantForm from "./form/second_applicant";
import ThirdApplicantForm from "./form/third_applicant";

export default function ThirdStepView() {
  const tabData = [
    {
      id: "first_user",
      label: "Boma Dave",
      content: <MainApplicantForm />,
    },
    {
      id: "second_user",
      label: "Urel Dave",
      content: <SecondApplicantForm />,
    },
    {
      id: "thrid_user",
      label: "Augustine Dave",
      content: <ThirdApplicantForm />,
    },
  ];
  return (
    <OnboardingLayout>
      <CustomTabs ariaLabel="History of Ancient Rome" tabs={tabData} />
    </OnboardingLayout>
  );
}
