import React from "react";
import DashboardLayout from "../layout";
import { FormHeading } from "../onboarding/what_next";
import MyAccountView from "./my_account";
import TrackPayoutView from "./track_payout";
import { CustomTabs } from "@/components/tabs";


export default function AccountAndPayoutView() {
  const tabData = [
    {
      id: "my_account",
      label: "My Account",
      content: <MyAccountView />,
    },
    {
      id: "track_payout",
      label: "Track Payout",
      content: <TrackPayoutView />,
    },
  ];
  return (
    <DashboardLayout>
      <div>
        <FormHeading
          headerText="Account & Payout"
          subHeading="Add your accounts, setup a default to receive payments, Track payment status"
        />
        <CustomTabs ariaLabel="Users tab" tabs={tabData} />
      </div>
    </DashboardLayout>
  );
}
