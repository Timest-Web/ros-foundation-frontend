import React from "react";
import MyAccountView from "./my_account";
import { CustomTabs } from "@/components/tabs";
import BeneficiaryDashboardLayout from "../layout";
import { FormHeading } from "@/views/layout";
import BeneficiaryNotificationView from "./notifications";



export default function BeneficiarySettingsView() {
  const tabData = [
    {
      id: "my_account",
      label: "My Account",
      content: <MyAccountView />,
    },
    {
      id: "notification",
      label: "Notification",
      content: <BeneficiaryNotificationView />,
    },
  ];
  return (
    <BeneficiaryDashboardLayout>
      <div>
        <FormHeading
          headerText="Settings"
          subHeading="General account Settings"
        />
        <CustomTabs ariaLabel="Users tab" tabs={tabData} />
      </div>
    </BeneficiaryDashboardLayout>
  );
}
