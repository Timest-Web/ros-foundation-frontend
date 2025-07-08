import React from "react";
import DashboardLayout from "../layout";
import { FormHeading } from "../onboarding/what_next";
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
    <DashboardLayout>
      <FormHeading
        headerText="Notifications"
        subHeading="All Notifications for all progress of your Application"
      />
      <CustomTabs ariaLabel="Users tab" tabs={tabData} />
    </DashboardLayout>
  );
}
