import React from "react";
import MainApplicantForm from "./form/main_applicant";
import { CustomTabs } from "@/components/tabs";
import SecondApplicantForm from "./form/second_applicant";
import ThirdApplicantForm from "./form/third_applicant";
import BeneficiaryDashboardLayout from "../layout";
import { FormHeading } from "@/views/layout";

export default function BeneficiaryUploadsView() {
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
    <BeneficiaryDashboardLayout>
      <FormHeading
        headerText="My Uploads"
        subHeading=" All your uploaded documents for your review"
      />
      <CustomTabs ariaLabel="Users tab" tabs={tabData} />
    </BeneficiaryDashboardLayout>
  );
}
