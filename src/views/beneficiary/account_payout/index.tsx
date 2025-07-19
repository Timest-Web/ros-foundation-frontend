import React from "react";
import MyAccountView from "./my_account";
import TrackPayoutView from "./track_payout";
import { CustomTabs } from "@/components/tabs";
import BeneficiaryDashboardLayout from "../layout";
import { FormHeading } from "@/views/layout";



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
    <BeneficiaryDashboardLayout>
      <div>
        <FormHeading
          headerText="Account & Payout"
          subHeading="Add your accounts, setup a default to receive payments, Track payment status"
        />
        <CustomTabs ariaLabel="Users tab" tabs={tabData} />
      </div>
    </BeneficiaryDashboardLayout>
  );
}
