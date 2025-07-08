import React from "react";
import DashboardLayout from "../../layout";
import MainApplicantForm from "./form/main_applicant";
import { CustomTabs } from "@/components/tabs";
import SecondApplicantForm from "./form/second_applicant";
import ThirdApplicantForm from "./form/third_applicant";
import { FormHeading } from "../what_next";

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
    <DashboardLayout>
      <FormHeading headerText="Third step" subHeading="Upload of documents & Means of Indentification" isBackButton={true}/>
      <CustomTabs ariaLabel="Users tab" tabs={tabData} />
    </DashboardLayout>
  );
}
