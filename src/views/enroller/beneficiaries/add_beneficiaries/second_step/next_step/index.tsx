import ProfileCard from "@/views/beneficiary/children_account/profile_card";
import EnrollerDashboardLayout from "@/views/enroller/layout";
import { FormHeading } from "@/views/layout";
import React from "react";
import FirstChildForm from "./first_child_form";
import SecondChildForm from "./second_child_form";
import { CustomTabs } from "@/components/tabs";

export default function EnrollerSecondStepNextStepView() {
  const tabData = [
    {
      id: "second_user",
      label: "Urel Dave",
      content: <FirstChildForm />,
    },
    {
      id: "thrid_user",
      label: "Augustine Dave",
      content: <SecondChildForm />,
    },
  ];
  return (
    <EnrollerDashboardLayout>
      <FormHeading
        headerText="Next step"
        subHeading="Upload documents for kids; Parent account is Boma Dave"
        isBackButton={true}
      />
      <div className="my-4"><ProfileCard href="/" /></div>
      <CustomTabs ariaLabel="Users tab" tabs={tabData} />
    </EnrollerDashboardLayout>
  );
}
