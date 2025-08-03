import React from "react";
import { FormHeading } from "@/views/layout";
import {
  DashboardCard,
} from "@/components/cards/dashboard_card";
import AccountManagerDashboardLayout from "@/views/account_manager/layout";

export default function AccountManagerAddBeneficiariesView() {
  return (
    <AccountManagerDashboardLayout>
      <FormHeading
        headerText="Add a Beneficiary"
        subHeading="Add new Beneficiaries"
      />
      <div className="grid grid-cols-2 gap-4 w-[70%]">
        <DashboardCard
          headingText="Add a Parent Beneficiary"
          content={<p>Create Parent Account</p>}
          buttonDisplay={true}
          buttonText="Get started"
          pageLink="/account-manager/first-level/beneficiaries/add-beneficiaries/add-parent"
        />
        {/* <DashboardCompletedCard
          pageLink="/"
          buttonText="Edit"
          headingText="Add a Parent Beneficiary"
          content={<p>Create Parent Account</p>}
        /> */}
        <DashboardCard
          headingText="Second step"
          content={
            <p>
              Add Kids Account to Parent Beneficiary,
              <span className="text-accent-100"> Maximum of 2</span>
            </p>
          }
          buttonDisplay={true}
          buttonText="Get started"
          pageLink="/account-manager/first-level/beneficiaries/add-beneficiaries/second-step"
        />
        <DashboardCard
          headingText="Third step"
          content={<p>Add a Beneficiary Bank account</p>}
          buttonDisplay={true}
          buttonText="Get started"
          pageLink="/account-manager/first-level/beneficiaries/add-beneficiaries/third-step"
        />
        <DashboardCard
          headingText="Lastly"
          content={
            <p>But not required, Add a business Proposal for user if any</p>
          }
          buttonDisplay={true}
          buttonText="Get started"
          pageLink="/account-manager/first-level/beneficiaries/add-beneficiaries/last-step"
        />
      </div>
    </AccountManagerDashboardLayout>
  );
}
