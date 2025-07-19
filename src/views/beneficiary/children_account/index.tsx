import React from "react";
import { CustomTabs } from "@/components/tabs";
import SecondApplicantForm from "./form/second_applicant";
import ThirdApplicantForm from "./form/third_applicant";
import BeneficiaryDashboardLayout from "../layout";
import { FormHeading } from "@/views/layout";

export default function ChildrenAccountView() {
  const tabData = [
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
        headerText="Children Account"
        subHeading="your children's account associated with you"
      />
      <CustomTabs ariaLabel="Users tab" tabs={tabData} />
    </BeneficiaryDashboardLayout>
  );
}
