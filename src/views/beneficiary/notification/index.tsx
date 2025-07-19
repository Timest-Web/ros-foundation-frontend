import React from "react";
import BeneficiaryDashboardLayout from "../layout";
import { FormHeading } from "@/views/layout";
import { CustomTabs } from "@/components/tabs";
import UnreadMessages from "./unread";
import ReadMessages from "./read";

export default function NotificationView() {
  const tabData = [
    {
      id: "unread",
      label: "Unread",
      content: <UnreadMessages />,
    },
    {
      id: "read",
      label: "Read",
      content: <ReadMessages />,
    },
  ];
  return (
    <BeneficiaryDashboardLayout>
      <FormHeading
        headerText="Notifications"
        subHeading="All Notifications for all progress of your Application"
      />
      <CustomTabs ariaLabel="Users tab" tabs={tabData} />
    </BeneficiaryDashboardLayout>
  );
}
